#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/rand.h>
#include <openssl/md5.h>

#ifdef _MSC_VER
// VC6的编译指示语句, 要求编译器在连接时搜索以下2个openssl库文件
#pragma comment(lib, "libeay32.lib")
#pragma comment(lib, "ssleay32.lib")
typedef unsigned __int64 ulong64;   // VC6中的64位非符号整数应该表示成unsigned __int64
#else
typedef unsigned long long ulong64; // Dev-C++或gcc中的64位非符号整数应表示成long long
#endif

#if 2147483647L+1L == -2147483648L 
// 若当前是32位编译器
typedef long long32;
typedef unsigned long ulong32;
#else
// 若当前是64位编译器
typedef int long32; 
typedef unsigned int ulong32;
#endif

typedef struct
{
   ulong32 n0;               // 链头n0为一个32位非符号整数, 是6个大写英文字母组合的序号
   unsigned char hash[0x10]; // 链尾hash为16字节的md5值       ~~~~~~~~~~~~~~~
} CHAIN; // CHAIN是构成彩虹表的任意一条链的结构

#define MAX_CHAINS 310000       /* 彩虹表中总共应包含的链的数量 */
#define NODES_PER_CHAIN 1000    /* 每条链中的节点数量 */
#define TOTAL_COMBINATIONS 308915776 /* 6个大写英文字母组合的数量, 308915776 = pow(26, 6) */
                      
unsigned char plaintext[6], hash[16]; // 明文和md5值
int  plaintext_len=6, hash_len=16;    // 明文长度和md5值长度
char charset[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 大字英文字母字符集



//#1_begin------------------------
int binSearch(CHAIN *chain, unsigned char hash[16], int low, int high);
int chechChain(CHAIN *chain, int chainIndex, int nodeIndex, unsigned char currentHash[16]);
void search(unsigned char p[], CHAIN *c, int low, int high);

int binSearch(CHAIN *chain, unsigned char hash[16], int low, int high) {
    int mid;
    int result = 0;
    int leftBorder = -1;
    while (low <= high) {
       mid = (high + low) / 2;
       result = memcmp(chain[mid].hash, hash, 16);
       if (result == 0) {
           leftBorder = mid;
           high = mid - 1;
       } else if (result > 0) {
           high = mid - 1;
           continue;
       } else {
           low = mid + 1;
           continue;
       }
    }
    return leftBorder;
}

int chechChain(CHAIN *chain, int chainIndex, int nodeIndex, unsigned char currentHash[16]) {
    int flag = 0;
    int n;
    unsigned char plainTextWithEnd[7];
    n = chain[chainIndex].n0; // 把随机数n转化成[0, TOTAL_COMBINATIONS-1]范围内的序号
    for(int step=0; step <= nodeIndex; step++) // 计算NODES_PER_CHAIN步, 生成一条链
    {
        for(int j=5; j>=0; j--) // 把序号n转化成明文plaintext，即转成对应的6个大写英文字母组合
        {
            plaintext[j] = charset[n % 26];
            n /= 26;
        }
        // 计算plaintext的md5值，保存到hash中
        MD5(plaintext, plaintext_len, hash);
        // 用削减函数把md5值转化成[0, TOTAL_COMBINATIONS-1]范围内下一个序号n
        n = ((*(ulong64 *)hash ^ *(ulong64 *)(hash+8)) + step) % TOTAL_COMBINATIONS;
    } // end of step
    if (memcmp(hash, currentHash, 16) == 0) {
        memcpy(plainTextWithEnd, plaintext, 6);
        plainTextWithEnd[6] = '\0';
        printf("%s\n", plainTextWithEnd);
        return 1;
    } else {
        return 0;
    }
}

void search(unsigned char p[], CHAIN *c, int low, int high) {    
    int index;
    int supposeLinkNode;
    int currentAttempt;
    int nValueAssume;
    unsigned char currentAttemptHash[16];

    for (supposeLinkNode = NODES_PER_CHAIN - 1; supposeLinkNode >= 0; supposeLinkNode --) {
        memcpy(currentAttemptHash, p, 16);
        for (currentAttempt = supposeLinkNode; currentAttempt < NODES_PER_CHAIN - 1; currentAttempt ++) {
            nValueAssume = ((*(ulong64 *)currentAttemptHash ^ *(ulong64 *)(currentAttemptHash+8)) + currentAttempt) % TOTAL_COMBINATIONS;
            for(int j=5; j>=0; j--) // 把序号n转化成明文plaintext，即转成对应的6个大写英文字母组合
            {
                plaintext[j] = charset[nValueAssume % 26];
                nValueAssume /= 26;
            }
            MD5(plaintext, plaintext_len, currentAttemptHash);
        }
        index = binSearch(c, currentAttemptHash, low, high);
        if (index != -1) {
            int currentIndex = index;
            while (currentIndex <= high && memcmp(c[currentIndex].hash, currentAttemptHash, 16) == 0) {
                if (chechChain(c, currentIndex, supposeLinkNode, p)) return;
                currentIndex ++;
            }
        }
    }
    printf("Not found!\n");
}
// if (chechChain(c, index, supposeLinkNode, p)) {
//     return;
// }
// int i = 0;
// while (1) {
//     i ++;
//     if (index + i >= MAX_CHAINS) {
//         break;
//     }
//     if (memcmp(c[index + i].hash, currentAttemptHash, 16) != 0) {
//         break;
//     }
//     if (chechChain(c, index + i, supposeLinkNode, p)) {
//         return;
//     }
// }
// i = 0;
// while (1) {
//     i ++;
//     if (index - i < 0) {
//         break;
//     }
//     if (memcmp(c[index - i].hash, currentAttemptHash, 16) != 0) {
//         break;
//     }
//     if (chechChain(c, index - i, supposeLinkNode, p)) {
//         return;
//     }
// }

//#1_end==========================

int main()
{
    // 以下pattern的值在评测时会改变
    double start_t, end_t, cost_t;
    start_t = clock();
   unsigned char pattern[16] = 
   {      
      0xb1, 0x69, 0xad, 0x4c, 0x6b, 0x90, 0xb0, 0x94, 
      0xdd, 0x84, 0x16, 0x7d, 0x35, 0x81, 0x5d, 0x4d
   }; // 对应明文为"ZZZZZX"
    // 以上pattern的值在评测时会改变

    CHAIN *chain;
    FILE *fp;
    ulong32 len;

    fp = fopen("chain.dat", "rb"); // 以二进制只读方式打开已按hash排序的彩虹表文件chain.dat
    if(fp==NULL)
    {
        puts("Cannot open file!");
        return 0;
    }
    fseek(fp, 0, SEEK_END);
    len = ftell(fp);
    fseek(fp, 0, SEEK_SET);
    if(len != sizeof(CHAIN)*MAX_CHAINS)
    {
        fclose(fp);
        puts("Bad src file!");
        return 0;
    }
    chain = (CHAIN *)malloc(len);
    if(chain == NULL)
    {
        fclose(fp);
        puts("Cannot allocate enough memory!");
        return 0;
    }
    fread(chain, sizeof(CHAIN), MAX_CHAINS, fp); // 把整个彩虹表读入内存
    fclose(fp);
    search(pattern, chain, 0, MAX_CHAINS-1); // 在chain指向的彩虹表中搜索pattern
    free(chain);
    end_t = clock();
    cost_t = (double)(end_t - start_t) / CLOCKS_PER_SEC * 1000;
    printf("Consuming time: %f\n", cost_t);
    return 0;
}
