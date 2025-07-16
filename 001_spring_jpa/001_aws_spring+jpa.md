#### 1. AAWS EC2 올리기 준비물

##### 1. 만들 프로젝트 배포파일로 만들기 .jar

```bash
    1.  spring boot
    2.  pom.xml 수정 - lombok 최신
    3.  maven install
```

##### 2. aws ec2

```bash
https://console.aws.amazon.com

1.  로그인 / 지역설정 - 언어설정
2.  ec2 - 대쉬보드
3.  인스턴스 - 이름 : myEc2 - Quick Start : ubuntu - Ubuntu Server 22.04 - 키페어 : Ec2_key rsa/pem - 네트워크설정 : 보안그룹 / ssh트래픽허용 - 위치무관 0.0.0.0/0 - 스토리지 구성 : 8Gib - 인스턴스개수 : 1

launch-wizard-1

```

##### 3. ec2접속

```bash
    15.164.210.76
    ssh -i "spring+jpa.pem" ubuntu@ec2-15-164-210-76.ap-northeast-2.compute.amazonaws.com
```

##### 4. ram

```bash
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo free -h
```

##### 5. jdk11

```bash
    1.  설치할수 있는 jdk 버젼
        sudo apt-cache search jdk
    2.  apt 업데이트
        sudo apt-get update
    3.  java 설치 - openjdk-11-jdk
        sudo apt-get install openjdk-11-jdk
    4.  java 확인
        java -version
    5.  자바경로확인
        which javac
        readlink -f /usr/bin/javac
    6. vi 경로등록
        sudo vi /etc/profile
        i
        export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
        export PATH=$JAVA_HOME/bin:$PATH
        export CLASSPATH=$CLASSPATH:$JAVA_HOME/jre/lib/ext:$JAVA_HOME/lib/tools.jar
        esc
        :wq!

    7. 소스반영
      source  /etc/profile

    8.  환경변수 확인
	  echo   $JAVA_HOME
	  echo   $PATH
	  echo   $CLASSPATH
```

```bash
# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))

# and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).

if [ "${PS1-}" ]; then
if [ "${BASH-}" ] && [ "$BASH" != "/bin/sh" ]; then # The file bash.bashrc already sets the default PS1. # PS1='\h:\w\$ '
if [ -f /etc/bash.bashrc ]; then
. /etc/bash.bashrc
fi
else
if [ "$(id -u)" -eq 0 ]; then
PS1='# '
else
PS1='$ '
fi
fi
fi

if [ -d /etc/profile.d ]; then
for i in /etc/profile.d/\*.sh; do
if [ -r $i ]; then
. $i
fi
done
unset i
fi

        export   JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
        export   PATH=$JAVA_HOME/bin:$PATH
        export   CLASSPATH=$CLASSPATH:$JAVA_HOME/jre/lib/ext:$JAVA_HOME/lib/tools.jar

```

##### 6. mysql

```bash
1. 설치할수 있는 mysql버젼
   sudo apt-cache search mysql-server
2. apt 업데이트
   sudo apt-get update
3. mysql설치 - mysql-server8.0
   sudo apt-get install mysql-server-8.0
4. mysql접속
   /etc/init.d/mysql status
   sudo mysql -uroot 비번없음
5. 인증확인
   select user, host, plugin from mysql.user;
6. 인증업데이트
   use mysql
   UPDATE user SET plugin='caching_sha2_password' WHERE user='root';
   flush privileges;
7. 비번바꾸기
   SET password for 'root'@'localhost'='1234';
8. db
   create database myboot;
9. 확인
   mysql -uroot -p
   1234
```

##### 7. scp

```bash
scp -i "C:\Users\sallyAn\Desktop\aws 추가\ec2_my.pem" "C:\Users\sallyAn\Desktop\aws 추가\mvcboard-0.0.1-SNAPSHOT.jar" ubuntu@43.201.10.186:/home/ubuntu/
yes
```

scp -i "C:\Users\sallyAn\Desktop\aws_20250715\spring+jpa.pem" "C:\Users\sallyAn\Desktop\aws_20250715\mvcboard-0.0.1-SNAPSHOT.jar" ubuntu@15.164.210.76:/home/ubuntu

##### 8. 백그라운드에서 실행명령어

```bash
   nohup java -jar mvcboard-0.0.1-SNAPSHOT.jar &
   jobs
```

##### 9.aws ec2 관리

port를 8080 열거나
port를 80으로

http://54.180.106.16:8080
