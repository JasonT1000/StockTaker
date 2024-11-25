// package com.rn_nativemodules;
package com.stocktaker;

import androidx.annotation.NonNull;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// This class implements the ReactPackage interface, which is responsible for providing NativeModules and ViewManagers to React Native
// It acts as a package manager for bridging native code with React Native
public class MyNativeModulePackage implements ReactPackage {

    // Method to create and return NativeModules to be used by React Native
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();

        // Add your custom NativeModule implementations to the list
        modules.add(new MyNativeModule(reactApplicationContext)); // Add MyNativeModule as a NativeModule
        return modules;
    }

    @NonNull @Override public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList(); // Return an empty list if you don't have any view managers
    }
}