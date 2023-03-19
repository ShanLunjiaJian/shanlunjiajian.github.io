#include<stdio.h>
#include<string.h>
#include<algorithm>
using std::next_permutation;

struct Edge{ int v,next; }e[36288002];
int h[3628802],ecnt;
inline void add_edge(int u,int v){ e[++ecnt]={v,h[u]},h[u]=ecnt; }
inline void clear(int n){ memset(h,0,sizeof(int)*(n+2)),ecnt=0; }

int fac[10];
inline int calc(int n,int *a)
{
	int ans=0;
	for(int i=1;i<=n;i++)
		for(int j=i+1;j<=n;j++)
			if(a[i]>a[j]) ans+=fac[n-i];
	return ans;
}

long long f[3628802];

int a[10],b[10];
inline void swap(int &x,int &y){ x^=y^=x^=y; }
inline void init(int n)
{
	clear((n+1)*fac[n]);
	for(int i=1;i<=n;i++) a[i]=i;
	do
	{
		int h=calc(n,a);
		for(int i=1;i<=n;i++)
		{
			add_edge(h+(i-1)*fac[n],h+i*fac[n]);
			for(int j=i+1;j<=n;j++)
				if(a[j]<a[i])
				{
					memcpy(b,a,sizeof(a));
					for(int k=i+1,last=i;k<=j;k++)
						if(a[last]>=a[k]&&a[k]>=a[j]) b[k]=a[last],last=k;
					b[i]=a[j];
					int th=calc(n,b);
					add_edge(h+(i-1)*fac[n],th+i*fac[n]);
				}
		}
	}
	while(next_permutation(a+1,a+n+1));
}

int n,m,t[10],g[3628802];

int main()
{
	int T;
	scanf("%d",&T);
	fac[0]=1;
	for(int i=1;i<=9;i++) fac[i]=fac[i-1]*i;
	while(T--)
	{
		scanf("%d%d",&n,&m);
		init(n);
		memset(f,0,sizeof(int)*(n+1)*fac[n]);
		memset(g,0,sizeof(int)*fac[n]);
		for(int i=1;i<=m;i++)
		{
			for(int j=1;j<=n;j++) scanf("%d",&t[j]);
			int h=calc(n,t);
			f[h]++,g[h]++;
		}
		for(int k=0;k<n;k++)
			for(int u=k*fac[n];u<(k+1)*fac[n];u++)
				for(int i=h[u];i;i=e[i].next) f[e[i].v]+=f[u];
		long long ans=0;
		for(int u=0;u<fac[n];u++) ans+=f[u+n*fac[n]]*g[u];
		printf("%lld\n",ans);
	}
	return 0;
}
