#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char plugboard[27]="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 默认plugboard没有任何导线
               /* 下标是明文，元素值为密文，举例如下：
                  设plugboard[0]='A'，它表示
                  明文=0+'A'='A'，密文='A'，即字母A上无导线;
                  设plugboard[1]='Y'，它表示
                  明文=1+'A'='B'，密文='Y'，即字母B和Y用导线对接。
                */
char rotor[4]; /* total 3 rotor numbers */
               /* e.g. rotor[0]=1, rotor[1]=2, rotor[2]=3 means
                  the left most rotor number is 1, the right most rotor number is 3
                */
char ring[4];  /* ring setting from left to right, e.g.
                  "UJZ" means 'U' is the ring setting for the
                  left most rotor, 'Z' is the ring setting for the right most rotor
                */
char key[4];   /* cipher key from left to right, e.g.
                  "CBA" means 'C' is the cipher key for the
                  left most rotor, 'A' is the cipher key for the right most rotor
                */

char rotor_table[5][27] =
{
   "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
   "AJDKSIRUXBLHWTMCQGZNPYFVOE",
   "BDFHJLCPRTXVZNYEIWGAKMUSQO",
   "ESOVPZJAYQUIRHXLNFTGKDCMWB",
   "VZBRGITYUPSDNHLXAWMJQOFECK"
};
char reflector[]="YRUHQSLDPXNGOKMIEBFZCWVJAT"; /* ReflectorWide_B */
char step_char[6]="RFWKA"; /* Royal Flags Wave Kings Above */

//#1_begin--------------
void gearSpinning(char *currentRing) {
    int gearIndex = 2;
    if (currentRing[gearIndex] == step_char[rotor[gearIndex] - '0' - 1] - 1) {
        currentRing[gearIndex] = ((currentRing[gearIndex] - 'A') + 1) % 26 + 'A';
        if (currentRing[gearIndex - 1] == step_char[rotor[gearIndex - 1] - '0' - 1] - 1) {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
            currentRing[gearIndex - 2] = ((currentRing[gearIndex - 2] - 'A') + 1) % 26 + 'A';
        } else {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
        }
    } else {
        currentRing[gearIndex] = ((currentRing[gearIndex] - 'A') + 1) % 26 + 'A';
        if (currentRing[gearIndex - 1] == step_char[rotor[gearIndex - 1] - '0' - 1] - 1) {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
            currentRing[gearIndex - 2] = ((currentRing[gearIndex - 2] - 'A') + 1) % 26 + 'A';
        }
    } 
}

char rotorEncode(char currentChar, char rotorNum, char *currentRing, int gearIndex, int isPositive) {
    char index;
    char processedChar;
    int delta;
    int rotorIndex = rotorNum - '0' - 1;
    
    delta = currentRing[gearIndex] - ring[gearIndex];
    currentChar = ((currentChar - 'A') + delta + 26) % 26 + 'A';
    if (isPositive) {
        index = currentChar - 'A';
        processedChar = rotor_table[rotorIndex][index];
    } else {
        processedChar = 'A' + strchr(rotor_table[rotorIndex], currentChar) - rotor_table[rotorIndex];
    }
    processedChar = ((processedChar - 'A') - delta + 26) % 26 + 'A';
    return processedChar; 
}

char reflactorEncode(char currentChar) {
    char index;
    char processedChar;
    index = currentChar - 'A';
    processedChar = reflector[index];
    return processedChar;
}

void customPluginGen(char *plugboard) {
    char tempReg;
    for (int i = 0; i < 10; i ++) {
        tempReg = plugboard[2 * i];
        plugboard[2 * i] = plugboard[2 * i + 1];
        plugboard[2 * i + 1] = tempReg;
    }
}

void mainEncode(char *cipher, char *plain) {
    int i;
    char currentChar;
    for (i = 0; cipher[i] != '\0'; i++) {
        currentChar = plugboard[cipher[i] - 'A'];
        gearSpinning(key);
        for (int j = 2; j != -1; j--) {
            currentChar = rotorEncode(currentChar, rotor[j], key, j, 1);
        }

        currentChar = reflactorEncode(currentChar);

        for (int j = 0; j != 3; j++) {
            currentChar = rotorEncode(currentChar, rotor[j], key, j, 0);
        }
        currentChar = plugboard[currentChar - 'A'];
        plain[i] = currentChar;
    }
    plain[i] = '\0';
}
//#1_end================

int main()
{
    char init_plug[0x20]="AB CD EF GH IJ KL MN OP QR ST";
    char init_ring[0x20]="UJZ";
    char cipher[0x100];
    char key_word[0x100];
    char plain[0x100];
    char init_key[0x20];
    char init_rotor[0x20];
    //#2_begin--------------
    char currentChar;
    char rotorSituation[60][4];
    int rotorSituationPosition = 0;
    char *checkRightPointer = NULL;
    gets(cipher);
    gets(key_word);
    strcpy(ring, init_ring);
    customPluginGen(plugboard);

    for (char position1 = '1'; position1 <= '5'; position1 ++) {
        for (char position2 = '1'; position2 <= '5'; position2 ++) {
            if (position1 == position2) continue;
            for (char position3 = '1'; position3 <= '5'; position3 ++) {
                if (position3 == position1 || position3 == position2) continue;
                rotorSituation[rotorSituationPosition][0] = position1;
                rotorSituation[rotorSituationPosition][1] = position2;
                rotorSituation[rotorSituationPosition][2] = position3;
                rotorSituation[rotorSituationPosition][3] = '\0';
                rotorSituationPosition ++;
            }
        }
    }
    
    for (int rotorProb = 0; rotorProb < 60; rotorProb ++) {
        strcpy(rotor, rotorSituation[rotorProb]);
        for (int keyProb = 0; keyProb < 26 * 26 * 26; keyProb ++) {
            init_key[0] = 'A' + (keyProb / (26 * 26)) % 26; 
            init_key[1] = 'A' + (keyProb / 26) % 26;        
            init_key[2] = 'A' + (keyProb % 26);             
            strcpy(key, init_key);
            mainEncode(cipher, plain);
            if (strstr(plain, key_word) != NULL) {
                strcpy(init_rotor, rotor);
                printf("%s\n", init_rotor);
                printf("%s\n", init_key);
                printf("%s\n", plain);
                goto done;
            }
        }
    }
   //#2_end================
done:   
   return 0;
}
