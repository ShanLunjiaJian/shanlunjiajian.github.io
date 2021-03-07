---
layout: post
title: SA，ST和SAM学习笔记
subtitle: 恐怖的东西
tags: 字符串
---

## 板子

### 简单的SA

如果我们只讲后缀数组SA，实际上会非常简单，因为SA要做的事情就是给后缀排序。这个我可以两句话说明白。

计算SA一般使用倍增法，也就是先对所有长$$1$$的子串排序，再对长$$2$$的子串排序，每次排序长度翻倍，最后排到长$$n$$的子串(当然，后面要补$$0$$)，就给后缀排好序了。排序子串的时候，你发现这是一个双关键字排序 : 比较两个长$$2^k$$的子串，可以先比较它们前面的$$2^{k-1}$$个字符，再比较后面$$2^{k-1}$$个字符，而这两次比较的结果已经在前一轮计算出来了。

-----

### ST和SAM

参考EtaoinWu神犇的[《感性理解 SAM》](https://etaoinwu.com/blog/%E6%84%9F%E6%80%A7%E7%90%86%E8%A7%A3-sam/)，这篇文章讲的非常好!我只是做了其中一部分的搬运工作而已/kk

ST和SAM都是对一个串的子串进行压缩。

ST是一棵压缩的Trie树，而SAM是一个压缩的ACAM。

#### ST

我们考虑一个简单的后缀数据结构，它把所有后缀扔进一棵Trie树，这个数据结构不妨称为后缀Trie。它的复杂度是$$O(n^2)$$，因为所有后缀的长度和是$$O(n^2)$$。

后缀Trie上每个点代表的应该是一个后缀的前缀，也就是一个子串；每个叶子代表一个后缀。那这么说，一共有$$n$$个叶子，而我们都知道如果一棵树有$$n$$个叶子，那么最多有$$n-1$$个分叉的(儿子个数大于$$1$$的)结点。如果不是很懂，你可以将分叉的结点视为合并儿子们来考虑这个问题。

也就是说，这棵树上有一大堆长链，注意这里的长链跟长链剖分的长链完全不一样。容易想到把每一条长链缩起来变成一条边，这样剩下的点数不超过$$2n-1$$。而每条长链在原串中应该是连续的，所以它们上面的字符可以简单地用一个区间来表示，这样缩长链之后每条边的信息量是$$O(1)$$的，我们就得到了线性的ST。不过我们还是需要建出后缀Trie?

还应该考虑更多性质。

后缀Trie上，向下走一条边的意义，是在当前子串后面接一个字符。形式化地，设$$u$$代表$$s[l,r]$$，那么$$\mathrm{fa}(u)$$代表$$s[l,r-1]$$。

对于后缀Trie上的一个点，它可能同时是很多后缀的前缀，因此同时代表很多子串，这些子串出现位置不同而内容相同。进一步地，一个点代表的子串，应该同时是 它子树里所有叶子代表的后缀 的前缀。而在一个点处产生了分叉，意味着它跟儿子们子树里的后缀不同了。缩长链这个过程，就是把同一些后缀的不同长度的前缀缩起来，或者用树的语言描述，就是把子树中叶子结点集合相同的点缩起来。

所以说，两个子串可以缩到一起，当且仅当包含它们为前缀的后缀集合相同。

考虑一个后缀被它的左端点唯一确定，那么两个子串等价，当且仅当它们出现位置的左端点集合相同，这里不懂可以自己画一画。我们定义一个子串$$t$$出现位置的左端点集合为$$\mathrm{Left(t)}$$。

压缩$$\mathrm{Left}$$等价类的算法......啊，我们先趁热打铁讲SAM的理论部分。

#### SAM

在后缀Trie上跑ACAM，我们就得到了一个匹配后缀的算法，不妨称为后缀ACAM。

这个ACAM上有非常奇妙的性质 : 一个子串的fail指针连向它前面去掉一个字符得到的子串。形式化地，设$$u$$代表$$s[l,r]$$，那么$$\mathrm{fail}(u)$$代表$$s[l+1,r]$$。回去看一看$$\mathrm{fa}$$的性质，你发现它们有奇妙的对称性!

更具体地，把一个串翻转过来之后，$$\mathrm{fa}$$和$$\mathrm{fail}$$互换了!所以刚才ST的分析，全部适用于SAM，只不过我们需要把$$\mathrm{Left}$$换成$$\mathrm{Right}$$。于是我们得到著名结论 : 正串SAM的fail树是反串的ST。

如果要一个直观理解，压缩$$\mathrm{Right}$$等价类，相当于把后缀Trie上相同的子树压缩起来。同时，如果把串反过来，你会发现SAM是在反串的ST上压缩长链，也就是在正串的fail树上压缩长链。

要实现SAM比较恶心，因为我们需要处理$$\mathrm{Right}$$等价类变化的问题。

首先我们需要几个简单的定理。

**定理1** 每一个$$\mathrm{Right}$$等价类包含的子串长度构成一个区间。

SAM最常用的算法是向右增量的。它的核心是`insert`函数，用于

```cpp
struct SAM
{
	int cnt,last,trans[MAXN+2][26],link[MAXN+2],maxlen[MAXN+2],mark[MAXN+2];
	
	Suffix_Automaton():cnt(1),last(1){};
	
	inline void insert(int c)
	{
		int cur=++cnt,u;
		for(u=last;u!=0&&trans[u][c]==0;u=link[u])
			trans[u][c]=cur;
		if(u==0)
			link[cur]=1;
		else
		{
			int v=trans[u][c];
			if(maxlen[v]==maxlen[u]+1)
				link[cur]=v;
			else
			{
				int clone=++cnt;
				for(int i=0;i<26;i++)
					trans[clone][i]=trans[v][i];
				link[clone]=link[v];
				maxlen[clone]=maxlen[u]+1;
				for(;u!=0&&trans[u][c]==v;u=link[u])trans[u][c]=clone;
				link[cur]=link[v]=clone;
			}
		}
		last=cur;	
	}
	
	inline void create(char* s,int len)
	{
		for(int i=1;i<=len;i++,s++)
			insert((*s)-'a');
		for(int u=last;u!=0;u=link[u])
			mark[u]=true;
	}
	
	inline int check(char* s,int len)
	{
		int u=1;
		for(int i=1;i<=len;i++,s++)
			if(trans[u][*s-'a'])
				u=trans[u][*s-'a'];
			else
				return 0;
		if(mark[u])
			return 1;
		return 2;
	}
}sam;
```

构造ST常用的有Ukkonen算法，这里不打算讲。想学习可以百度，反正你已经了解理论了。不过Ukkonen有一个不可替代的作用，是说构造SAM常用的算法是向右增量的，而对应到反串就是向左增量，但是Ukkonen是一个向右增量的算法，所以把两个算法结合起来就可以得到双向增量的后缀树算法。

## 经典trick