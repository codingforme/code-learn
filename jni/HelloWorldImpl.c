#include "jni.h"
#include "nativetest_CaculatorInC.h"
 
//#include otherheaders
 

JNIEXPORT jint JNICALL Java_nativetest_CaculatorInC_add
(JNIEnv * env, jobject object, jint a, jint b){
    return a + b;
}
