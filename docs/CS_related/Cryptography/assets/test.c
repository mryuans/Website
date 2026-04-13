#pragma GCC optimize("O3,unroll-loops")
#include <time.h>
#include <stdio.h>
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
//#1_begin------------------------

// 极限优化：安全的 64 位整数提取，同时匹配题目生成器的特殊异或逻辑
static inline unsigned int get_next_n(unsigned char *h, int step) {
    ulong64 h1, h2;
    memcpy(&h1, h, 8);
    memcpy(&h2, h + 8, 8);
    return ((h1 ^ h2) + step) % TOTAL_COMBINATIONS;
}

// 优化版的二分查找：寻找具有相同 Hash 的连续块的【最左侧边界】
// 这样在匹配碰撞时，我们只需要单向向右遍历，减少了边界判断和分支开销
int binSearchLeftmost(CHAIN *chain, unsigned char hash[16], int low, int high) {
    int mid, result;
    int first_idx = -1;
    while (low <= high) {
        mid = low + (high - low) / 2;
        result = memcmp(chain[mid].hash, hash, 16);
        if (result == 0) {
            first_idx = mid;
            high = mid - 1; // 找到了，但继续向左逼近寻找最左侧的边界
        } else if (result > 0) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return first_idx;
}

// 检查该链是否为真正的明文路径（剔除碰撞导致的假阳性）
int chechChain(CHAIN *chain, int chainIndex, int targetStep, unsigned char originalPattern[16]) {
    unsigned int n = chain[chainIndex].n0; 
    unsigned char pt[6];
    unsigned char h[16];

    // 将最后一步单独剥离，消灭 for 循环内的 if 判断（消除分支预测惩罚）
    for(int step = 0; step < targetStep; step++) 
    {
        unsigned int temp_n = n;
        // 算术运算代替数组查表，消除访存延迟
        pt[5] = temp_n % 26 + 'A'; temp_n /= 26;
        pt[4] = temp_n % 26 + 'A'; temp_n /= 26;
        pt[3] = temp_n % 26 + 'A'; temp_n /= 26;
        pt[2] = temp_n % 26 + 'A'; temp_n /= 26;
        pt[1] = temp_n % 26 + 'A'; 
        pt[0] = temp_n / 26 + 'A'; 
        
        MD5(pt, 6, h);
        n = get_next_n(h, step);
    } 
    
    // 执行最后一步的验证
    unsigned int temp_n = n;
    pt[5] = temp_n % 26 + 'A'; temp_n /= 26;
    pt[4] = temp_n % 26 + 'A'; temp_n /= 26;
    pt[3] = temp_n % 26 + 'A'; temp_n /= 26;
    pt[2] = temp_n % 26 + 'A'; temp_n /= 26;
    pt[1] = temp_n % 26 + 'A'; 
    pt[0] = temp_n / 26 + 'A'; 
    
    MD5(pt, 6, h);
    if (memcmp(h, originalPattern, 16) == 0) {
        char out[7];
        memcpy(out, pt, 6);
        out[6] = '\0'; // 安全构造字符串
        puts(out);
        return 1;
    }
    return 0;
}

void search(unsigned char p[], CHAIN *c, int low, int high) {    
    int index;
    int supposeLinkNode;
    int currentAttempt;
    unsigned int nValueAssume;
    unsigned char currentAttemptHash[16];
    unsigned char pt[6];
    
    // 从后往前假设当前密文在链中的位置
    for (supposeLinkNode = NODES_PER_CHAIN - 1; supposeLinkNode >= 0; supposeLinkNode--) {
        memcpy(currentAttemptHash, p, 16);
        
        for (currentAttempt = supposeLinkNode; currentAttempt < NODES_PER_CHAIN - 1; currentAttempt++) {
            nValueAssume = get_next_n(currentAttemptHash, currentAttempt);
            
            // 算术计算，展开循环
            pt[5] = nValueAssume % 26 + 'A'; nValueAssume /= 26;
            pt[4] = nValueAssume % 26 + 'A'; nValueAssume /= 26;
            pt[3] = nValueAssume % 26 + 'A'; nValueAssume /= 26;
            pt[2] = nValueAssume % 26 + 'A'; nValueAssume /= 26;
            pt[1] = nValueAssume % 26 + 'A'; 
            pt[0] = nValueAssume / 26 + 'A';
            
            MD5(pt, 6, currentAttemptHash);
        }
        
        // 使用最左边界二分查找
        index = binSearchLeftmost(c, currentAttemptHash, low, high);
        
        if (index != -1) {
            // 因为找的是最左边界，所以只需要单向向右扫描所有 Hash 相同的碰撞节点即可
            int curr_idx = index;
            while (curr_idx <= high && memcmp(c[curr_idx].hash, currentAttemptHash, 16) == 0) {
                if (chechChain(c, curr_idx, supposeLinkNode, p)) return;
                curr_idx++;
            }
        }
    }
    puts("Not found!");
}
//#1_end==========================

int main()
{
    // 以下pattern的值在评测时会改变
    double start_t, end_t, cost_t;
    start_t = clock();
   unsigned char pattern[16] = 
   {      
      0xa1, 0xfa, 0x31, 0xcb, 0x3c, 0x39, 0xae, 0x31, 
      0x25, 0xbc, 0x74, 0xb5, 0x70, 0xdc, 0x22, 0x6b
   };
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
