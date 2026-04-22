<script setup lang="tsx">
import { provide } from "vue";
import dayjs from "@/assets/ts/dayjs";
import Anchor from "@/components/md/Anchor.vue";
import BlockCode from "@/components/md/BlockCode.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Delimiter from "@/components/md/Delimiter.vue";
import DotPattern from "@/components/md/DotPattern.vue";
import Fold from "@/components/md/Fold.vue";
import Grid from "@/components/md/Grid.vue";
import Heading from "@/components/md/Heading.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import Index from "@/components/md/Index.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import LinkCard from "@/components/md/LinkCard.vue";
import Note from "@/components/md/Note.vue";
import Tab from "@/components/md/Tab.vue";
import Waterfall from "@/components/md/Waterfall.vue";

import dep_0 from "/docs/CS_related/Cryptography/assets/ECB.png";
import dep_1 from "/docs/CS_related/Cryptography/assets/CBC.png";
import dep_2 from "/docs/CS_related/Cryptography/assets/CBF.png";


provide("katex-macros", {});
const expr_0 = "P = [P_1, P_2, ..., P_L]\n";
const expr_1 = "C = [C_1, C_2, ..., C_L]\n";
const expr_2 = "";
const expr_3 = "Cipher Block Chaining (CBC) mode encryption and decryption";
const expr_4 = "";
const expr_5 = <>补充说明</>;
const expr_6 = "\\begin{aligned}\nIV_1 &= IV[0][1]...[7] \\\\\n\\downarrow \\\\\nIV_2 &= IV[1][2]...C[0] \\\\\n\\end{aligned}\n";

</script>

<template>
<Heading :level=3 :id=1>Electronic codebook(ECB)</Heading>
<div class="quote">The natural manner for using a block cipher is to break a long piece of plaintext into appropriate sized blocks of plaintext and process each block separately with the encryption function <InlineMath data="E_K()"></InlineMath>. This is known as the electronic codebook(ECB) mode of operation.</div>
<p>The plaintext P is broken into smaller chunks:</p>
<BlockMath :data="expr_0"></BlockMath><p>and the ciphertext is:</p>
<BlockMath :data="expr_1"></BlockMath><p>where <InlineMath data="C_j = E_k(P_j)"></InlineMath> is the encryption of <InlineMath data="P_j"></InlineMath> using the key K.</p>
<p><ImageCaptioned :src="dep_0" :alt="expr_2"></ImageCaptioned></p>
<p>电子密码簿ECB 加密过程：<InlineMath data="C_j = E_k(P_j)"></InlineMath></p>
<p>电子密码簿ECB 解密过程：<InlineMath data="P_j = D_k(C_j)"></InlineMath></p>
<p>电子密码簿模式的弱点是:对于相同内容的明文段，加密后得到的密文块是相同的。</p>
<p>电子密码簿模式的优点是:加密和解密过程均可以并行处理。</p>
<Heading :level=3 :id=2>Cipher Block Chaining(CBC)</Heading>
<p><ImageCaptioned :src="dep_1" :alt="expr_3">Cipher Block Chaining (CBC) mode encryption and decryption</ImageCaptioned></p>
<p>CBC模式的特点是：当前块的密文与前一块的密文有关; 加密过程只能串行处理; 解密过程可以并行处理;</p>
<Heading :level=3 :id=3>Cipher Block Feedback(CBF)</Heading>
<p><ImageCaptioned :src="dep_2" :alt="expr_4"></ImageCaptioned></p>
<Fold type="warning" :title="expr_5" :expand="true">
<p>加密的逻辑有一些简化，实际上有这么几个注意点：</p>
<ol>
<li>对于每一个密钥参与的算法的返回值Q，实际上都只会使用Q的第一个字节与P(plaintext)的某一个字节进行异或计算</li>
<li>对于IV的每一轮的变化如下：</li>
</ol>
<BlockMath :data="expr_6"></BlockMath><p>以此类推</p>
</Fold>

</template>
