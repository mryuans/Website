#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char plugboard[27];
               /* e.g. "ZBCDEFGHIJKLMNOPQRSTUVWXYA" means 'A' & 'Z' are swapped
                  键盘输入的字符i，须查询此表，得到进入最右侧齿轮的字符
                  o = plugboard[i-'A'];
                  同理，按从左到右方向从最右侧齿轮出来的信号i，须查询此表，得到
                  亮灯信号
                  o = plugboard[i-'A'];
                */
char rotor[3]; /* total 3 rotor numbers */
               /* e.g. rotor[0]=1, rotor[1]=2, rotor[2]=3 means
                  the left most rotor number is 1, the right most rotor number is 3
                */
char ring[4];  /* ring setting from left to right, e.g.
                  "UJZ" means 'U' is the ring setting for the
                  left most rotor, 'Z' is the ring setting for the right most rotor
                */
char key[4];   /* message key from left to right, e.g.
                  "CBA" means 'C' is the message key for the
                  left most rotor, 'A' is the message key for the right most rotor
                */

char rotor_table[5][27] =
{
   "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
   "AJDKSIRUXBLHWTMCQGZNPYFVOE",
   "BDFHJLCPRTXVZNYEIWGAKMUSQO",
   "ESOVPZJAYQUIRHXLNFTGKDCMWB",
   "VZBRGITYUPSDNHLXAWMJQOFECK"
};             /* 从右到左方向进入第r号齿轮(r∈[1,5])的字符i，可查询此表，得到输出字符
                  o = rotor_table[r-1][i-'A'];
                */

char reflector[]="YRUHQSLDPXNGOKMIEBFZCWVJAT"; 
               /* 进入反射板的字符i，可查询此表，得到输出字符
                  o = reflector[i-'A'];
                */

char step_char[6]="RFWKA"; 
               /* 位于齿轮左侧的圆圈上的卡口(notch)字母可根据此表查询:
                  第r号齿轮(r∈[1,5])的notch = step_char[r-1]-1;
                */

// 根据密文cipher、明文的首个单词key_word、接线板的初始值init_plug
// 破解出齿轮的排列init_rotor以及明文plain
void crack(char cipher[], char key_word[], char init_plug[], char init_rotor[], char plain[]);

/*==========================================================*/
/*(1)请在此处定义函数crack()                                   */
char init_key[4];
char reverseRotorTable[5][27];
int gearIndex = 2;
char rightControl;
char midControl;
void gearSpinning(char *currentRing) {
    if (currentRing[gearIndex] == rightControl) {
        currentRing[gearIndex] = ((currentRing[gearIndex] - 'A') + 1) % 26 + 'A';
        if (currentRing[gearIndex - 1] == midControl) {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
            currentRing[gearIndex - 2] = ((currentRing[gearIndex - 2] - 'A') + 1) % 26 + 'A';
        } else {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
        }
    } else {
        currentRing[gearIndex] = ((currentRing[gearIndex] - 'A') + 1) % 26 + 'A';
        if (currentRing[gearIndex - 1] == midControl) {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
            currentRing[gearIndex - 2] = ((currentRing[gearIndex - 2] - 'A') + 1) % 26 + 'A';
        }
    } 
}

char rotorEncodeForward(char currentChar, char rotorNum, char *currentRing, int gearIndex) {
    int index;
    char processedChar;
    int delta;
    int rotorIndex = rotorNum - '0' - 1;
    
    delta = currentRing[gearIndex] - ring[gearIndex];
    currentChar = ((currentChar - 'A') + delta + 26) % 26 + 'A';
    index = currentChar - 'A';
    processedChar = rotor_table[rotorIndex][index];
    processedChar = ((processedChar - 'A') - delta + 26) % 26 + 'A';
    return processedChar; 
}

char rotorEncodeBackward(char currentChar, char rotorNum, char *currentRing, int gearIndex) {
    int index;
    char processedChar;
    int delta;
    int rotorIndex = rotorNum - '0' - 1;
    delta = currentRing[gearIndex] - ring[gearIndex];
    currentChar = ((currentChar - 'A') + delta + 26) % 26 + 'A';
    processedChar = reverseRotorTable[rotorIndex][currentChar - 'A'];
    processedChar = ((processedChar - 'A') - delta + 26) % 26 + 'A';
    return processedChar; 
}



char reflactorEncode(char currentChar) {
    int index;
    char processedChar;
    index = currentChar - 'A';
    processedChar = reflector[index];
    return processedChar;
}

void customPluginGen(char *init_plug) {
    int i;
    char tempRegA;
    char tempRegB;
    for (i = 0; i < 26; i ++) {
        plugboard[i] = i + 'A';
    }
    plugboard[26] = '\0';
    for (i = 0; init_plug[i] != '\0'; i ++) {
        if (init_plug[i] != ' ' && init_plug[i + 1] != '\0' && init_plug[i + 1] != ' ') {
            tempRegA = init_plug[i];
            tempRegB = init_plug[i + 1];
            plugboard[tempRegA - 'A'] = tempRegB;
            plugboard[tempRegB - 'A'] = tempRegA;
            i ++;
        }
    }
}

int quickTest(char *cipher, char *key_word, int strLength, char* testKey) {
    char currentChar;
    int i;
    for (i = 1; i < strLength; i ++) {
        currentChar = plugboard[cipher[i] - 'A'];
        gearSpinning(testKey);
        for (int j = 2; j != -1; j--) {
            currentChar = rotorEncodeForward(currentChar, rotor[j], testKey, j);
        }

        currentChar = reflactorEncode(currentChar);

        for (int j = 0; j != 3; j++) {
            currentChar = rotorEncodeBackward(currentChar, rotor[j], testKey, j);
        }
        currentChar = plugboard[currentChar - 'A'];
        if (currentChar != key_word[i]) return 1;
    }
    return 0;
}

int quickDeltaCheck(int delta1, int delta2, int delta3, int firstCipherIndex, char firstKeyWord) {
    int deltaSet[3] = { delta1, delta2, delta3 };
    for (int i = 2; i >= 0; i --) {
        firstCipherIndex = (firstCipherIndex + deltaSet[i] + 26) % 26;
        firstCipherIndex = rotor_table[rotor[i] - '0' - 1][firstCipherIndex] - 'A';
        firstCipherIndex = (firstCipherIndex - deltaSet[i] + 26) % 26;
    }
    firstCipherIndex = reflector[firstCipherIndex] - 'A';
    for (int i = 0; i <= 2; i ++) {
        firstCipherIndex = (firstCipherIndex + deltaSet[i] + 26) % 26;
        firstCipherIndex = reverseRotorTable[rotor[i] - '0' - 1][firstCipherIndex] - 'A';
        firstCipherIndex = (firstCipherIndex - deltaSet[i] + 26) % 26;
    }
    if (plugboard[firstCipherIndex] == firstKeyWord) {
        return 1;
    } else {
        return 0; 
    }
}

void crack(char cipher[], char key_word[], char init_plug[], char init_rotor[], char plain[]) {
    char rotorSituation[60][3];
    int rotorSituationPosition = 0;
    int keyLength = strlen(key_word);
    int cipherLength = strlen(cipher);
    int mapCipher[256];
    customPluginGen(init_plug);
    for (int i = 0; i < cipherLength; i ++) {
        mapCipher[i] = plugboard[cipher[i] - 'A'] -'A';
    }


    for (int rIndex = 0; rIndex < 5; rIndex ++) {
        for (int mapIndex = 0; mapIndex < 26; mapIndex ++) {
            reverseRotorTable[rIndex][rotor_table[rIndex][mapIndex] - 'A'] = mapIndex + 'A';
        }
    }

    for (char position1 = '1'; position1 <= '5'; position1 ++) {
        for (char position2 = '1'; position2 <= '5'; position2 ++) {
            if (position1 == position2) continue;
            for (char position3 = '1'; position3 <= '5'; position3 ++) {
                if (position3 == position1 || position3 == position2) continue;
                rotorSituation[rotorSituationPosition][0] = position1;
                rotorSituation[rotorSituationPosition][1] = position2;
                rotorSituation[rotorSituationPosition][2] = position3;
                rotorSituationPosition ++;
            }
        }
    }
    
    for (int rotorProb = 0; rotorProb < 60; rotorProb ++) {
        rotor[0] = rotorSituation[rotorProb][0];
        rotor[1] = rotorSituation[rotorProb][1];
        rotor[2] = rotorSituation[rotorProb][2];

        rightControl = 'A' + (step_char[rotor[gearIndex] - '0' - 1] - 'A' - 1 + 26) % 26;
        midControl = 'A' + (step_char[rotor[gearIndex - 1] - '0' - 1] - 'A' - 1 + 26) % 26;

        int preDeltaCheck[10000][3];
        int preCount = 0;
        for (int delta1 = 0; delta1 < 26; delta1 ++) {
            for (int delta2 = 0; delta2 < 26; delta2 ++) {
                for (int delta3 = 0; delta3 < 26; delta3 ++) {
                    int firstCipherIndex= plugboard[cipher[0] - 'A'] - 'A';
                    int secondCipherIndex = plugboard[cipher[1] - 'A'] - 'A';
                    if (quickDeltaCheck(delta1, delta2, delta3, firstCipherIndex, key_word[0])) {
                        int nextDelta1 = (delta1 + 1) % 26;
                        int nextDelta2 = (delta2 + 1) % 26;
                        int nextDelta3 = (delta3 + 1) % 26;

                        if (quickDeltaCheck(delta1, delta2, nextDelta3, secondCipherIndex, key_word[1]) ||
                                quickDeltaCheck(delta1, nextDelta2, nextDelta3, secondCipherIndex, key_word[1]) ||
                                quickDeltaCheck(nextDelta1, nextDelta2, nextDelta3, secondCipherIndex, key_word[1])) {
                            preDeltaCheck[preCount][0] = delta1;
                            preDeltaCheck[preCount][1] = delta2;
                            preDeltaCheck[preCount][2] = delta3;
                            preCount ++;
                        }
                    }
                }
            }
        }

        char key2[2] = {
            'A' + (step_char[rotor[1] - '0' - 1] - 'A' - 1 + 26) % 26,
            'A' + (step_char[rotor[1] - '0' - 1] - 'A' -  2 + 26) % 26,
        };           
        for (char key1 = 'A'; key1 <= 'Z'; key1 ++) {
            int key3Init = 'A' + (step_char[rotor[2] - '0' - 1] - 'A' - 1 + 26) % 26;
            for (int key2Id = 0; key2Id <= 1; key2Id ++) {
                int count = 0;
                for (char key3 = key3Init; count <= keyLength; key3 = 'A' + (key3 - 'A' - 1 + 26) % 26) {
                    count ++;
                    char simKey[4];
                    simKey[0] = key1;
                    simKey[1] = key2[key2Id];
                    simKey[2] = key3;
                    int midSteps = 0;
                    int leftSteps = 0;
                    char prevMid = simKey[1];
                    char prevLeft = simKey[0];

                    for (int step = 0; step < keyLength; step++) {
                        gearSpinning(simKey);
                        if (simKey[1] != prevMid) { 
                            midSteps++; 
                            prevMid = simKey[1]; 
                        }
                        if (simKey[0] != prevLeft) { 
                            leftSteps++; 
                            prevLeft = simKey[0]; 
                        }
                    }
                    if (midSteps != 2 || leftSteps != 1) continue;

                    char keyMidState[4];
                    keyMidState[0] = key1;
                    keyMidState[1] = key2[key2Id];
                    keyMidState[2] = key3;
                    gearSpinning(keyMidState);
                    for (int ringSettingCount = 0; ringSettingCount < preCount; ringSettingCount ++) {
                        ring[0] = 'A' + (keyMidState[0] - 'A' - preDeltaCheck[ringSettingCount][0] + 26) % 26;
                        ring[1] = 'A' + (keyMidState[1] - 'A' - preDeltaCheck[ringSettingCount][1] + 26) % 26;
                        ring[2] = 'A' + (keyMidState[2] - 'A' - preDeltaCheck[ringSettingCount][2] + 26) % 26;
                        char testKey[4];
                        testKey[0] = keyMidState[0];
                        testKey[1] = keyMidState[1];
                        testKey[2] = keyMidState[2];
                        if (quickTest(cipher, key_word, keyLength, testKey)) continue;
                        key[0] = key1;
                        key[1] = key2[key2Id];
                        key[2] = key3;
                        for (int i = 0; i < cipherLength; i ++) {
                            int currentChar = mapCipher[i] + 'A';
                            gearSpinning(key);
                            for (int j = 2; j != -1; j--) {
                                currentChar = rotorEncodeForward(currentChar, rotor[j], key, j);
                            }

                            currentChar = reflactorEncode(currentChar);

                            for (int j = 0; j != 3; j++) {
                                currentChar = rotorEncodeBackward(currentChar, rotor[j], key, j);
                            }
                            currentChar = plugboard[currentChar - 'A'];
                            plain[i] = currentChar;

                        }
                        plain[cipherLength] = '\0';
                        init_rotor[0] = rotor[0];
                        init_rotor[1] = rotor[1];
                        init_rotor[2] = rotor[2];
                        init_rotor[3] = '\0';
                        return;
                    }
                }
            }
        }
    }
}


/*(2)函数crack()上方允许定义全局变量以及被crack()调用的函数        */
/*==========================================================*/


int main()
{
    char cipher[0x100];    // 密文
    char key_word[0x100];  // 明文中的首个单词
    char init_plug[] = "AZ BY CX DW EV FU GT HS IR JQ KP LO MN"; // 接线板初始值
    char init_rotor[0x20]; // 齿轮排列
    char plain[0x100];     // 明文

    gets(cipher);          // 输入密文 
    gets(key_word);        // 输入明文中的首个单词
    crack(cipher, key_word, init_plug, init_rotor, plain); 
    // 根据密文cipher、明文的首个单词key_word、接线板的初始值init_plug
    // 破解出齿轮的排列init_rotor以及明文plain
    printf("rotor:%s\n", init_rotor); // 输出齿轮排列
    printf("plain:%s\n", plain);      // 输出明文
    return 0;
}
