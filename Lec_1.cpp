#include<iostream>
using namespace std;
void print1(int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            cout<<"*";
        }
        cout<<endl;
    }
}
void print2(int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<=i;j++){
            cout<<"*";
        }
        cout<<endl;
    }
}
void print3(int n){
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            cout<<j;
        }
        cout<<endl;
    }
}
void print4(int n){
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            cout<<i;
        }
        cout<<endl;
    }
}
void print5(int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n-i;j++){
            cout<<"*";
        }
        cout<<endl;
    }
}
void print6(int n){
    for(int i=1;i<=n;i++){
        for(int j=1;j<=n+1-i;j++)cout<<j;
        cout<<endl;
    }
}
void print7(int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n-i-1;j++)cout<<" ";
        for(int j=0;j<2*i+1;j++)cout<<"*";
        for(int j=0;j<n-i-1;j++)cout<<" ";
        cout<<endl;
    }
}
void print8(int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<i;j++)cout<<" ";
        for(int j=0;j<2*n-(2*i+1);j++)cout<<"*";
        for(int j=0;j<i;j++)cout<<" ";
        cout<<endl;
    }
}
void print9(int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<n-i-1;j++)cout<<" ";
        for(int j=0;j<2*i+1;j++)cout<<"*";
        for(int j=0;j<n-i-1;j++)cout<<" ";
        cout<<endl;
    }
    for(int i=0;i<n;i++){
        for(int j=0;j<i;j++)cout<<" ";
        for(int j=0;j<2*n-(2*i+1);j++)cout<<"*";
        for(int j=0;j<i;j++)cout<<" ";
        cout<<endl;
    
    }
}
void print10(int n){
    for(int i=0;i<2*n-1;i++){
        int star =i;
        if(i>n) star=2*n-i;
        for(int j=0;j<star;j++)cout<<"*";
        cout<<endl;
    }
}
void print11(int n){
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            if((i%2!=0 && j%2!=0)||(i%2==0 && j%2==0)){
                cout<<"1 ";
            }
            else{
                cout<<"0 ";
            }
        }
        cout<<endl;
    }
}
void print12(int n){
    for(int i=0;i<n;i++){
        for(int j=0;j<i;j++)cout<<j+1<<" ";
        for(int j=0;j<2*(2*n-(2*i+2));j++)cout<<" ";
        for(int j=0;j<i;j++)cout<<i-j<<" ";
        cout<<endl;
    }
}
void print13(int n){
    int a=1;
    for(int i=1;i<=n;i++){
        for (int j=1;j<=i;j++){
            cout<<a<<" ";
            a=a+1;
            
        }
        cout<<endl;
    }
}
void print14(int n){
    string N="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(int i=0;i<=n;i++){
        for(int j=0;j<i;j++)cout<<N[j]<<" ";
        cout<<endl;
    }
}
void print15(int n){
    string N="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(int i=0;i<=n;i++){
        for(int j=0;j<n-i;j++)cout<<N[j]<<" ";
        cout<<endl;
    }
}
void print16(int n){
    string N="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(int i=0;i<=n;i++){
        for(int j=0;j<i;j++)cout<<N[i-1]<<" ";
        cout<<endl;
    }
}
void print17(int n){
    for (int i=1; i<=n;i++){
        // char ch='A';
        for ( char ch='A';ch<i;ch++)cout<<ch;
        cout<<endl;
    }
}
void print18(int n){
    for(int i=0;i<2*n-1;i++){
        
        for(int j=0;j<2*n-1;j++){
            int top=i;
            int left=j;
            int right=2*n-(j+2);
            int down=2*n-(i+2);
            cout<<n-min(min(top,right),min(down,left))<<" ";
        }
        cout<<endl;
    }
}
int main(){
    int stars;
    cin>>stars;
    print18(stars);
    return 0;
}