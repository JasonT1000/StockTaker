// package com.rn_nativemodules;
package com.stocktaker;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

// This class serves as a bridge between the native Android code and the React Native JavaScript code
// It extends ReactContextBaseJavaModule, which is a base class for native modules in React Native
public class MyNativeModule extends ReactContextBaseJavaModule {
    // Define the module name that will be used to reference this module in React Native
    private static final String MODULE_NAME ="MyNativeModule";
    private ReactApplicationContext reactContext;

    // Constructor
    public MyNativeModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    // Return the name of the module
    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    // Define native methods that can be called from React Native using @ReactMethod annotation

    // Method to log a message received from React Native
    @ReactMethod
    public void myMethod(String param){
        System.out.println("GET DATA FROM RN <--- "+param);
        Log.d(MODULE_NAME, param);
    }

    // Method to send data back to React Native with a promise
    @ReactMethod
    public void myMethodWithPromise(String param, Promise promise){
        // Check if the parameter is not null
        if (param != null) {
            // Resolve the promise with a success message
            promise.resolve("SEND DATA TO RN ---> " + param);
        } else {
            // Reject the promise with an error code and message
            promise.reject("ERROR_CODE", "Error message explaining failure");
        }
    }

    // You can define more native methods here to be called from React Native
    // For example, adding and removing event listeners

    // Method to send an event to React Native
    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        // Access the device event emitter module and emit an event with parameters
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    // Example method triggered from React Native to send an event
    @ReactMethod
    public void triggerEvent() {
        // Create parameters to send with the event
        WritableMap params = new WritableNativeMap();
        params.putString("message", "Hello from native code!");

        // Call the sendEvent method to emit "MyEvent" with params to React Native
        sendEvent(getReactApplicationContext(), "MyEvent", params);
    }

}