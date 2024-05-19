#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"FlajooApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  NSURL *jsCodeLocation;
  
  #ifdef DEBUG
    // Check if an environment variable is set for a custom port
    NSString *jsPort = [[[NSProcessInfo processInfo] environment] objectForKey:@"JS_SERVER_PORT"];
    if (jsPort == nil) {
      jsPort = @"8081"; // Default port
    }
    jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://192.168.0.14:%@/index.bundle?platform=ios&dev=true", jsPort]];
  #else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"FlajooApp"
                                               initialProperties:self.initialProps
                                                   launchOptions:launchOptions];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  return YES;
}

@end
