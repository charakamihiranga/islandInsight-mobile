import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import { View } from "react-native";
import colors from "../../constants/colors";

export default function TabLayout() {
    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopWidth: 1,
                    borderTopColor: colors.white,
                    height: 70,
                    paddingBottom: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingTop: 10,
                    justifyContent: "center",
                },
                tabBarItemStyle: {
                    height: 60,
                    alignItems: "center",
                    justifyContent: "center",
                },
                tabBarInactiveTintColor: colors.white,
                tabBarActiveTintColor: colors.white,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "Home",
                    title: "Home",
                    tabBarIcon: ({ size, focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 30,
                                width: 50,
                                height: 50,
                            }}
                        >
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                size={26}
                                color={focused ? colors.primary : colors.darkGray}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="business"
                options={{
                    headerTitle: "Business News",
                    title: "Business News",
                    tabBarIcon: ({ size, focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 30,
                                width: 50,
                                height: 50,
                            }}
                        >
                            <Ionicons
                                name={focused ? "briefcase" : "briefcase-outline"}
                                size={26}
                                color={focused ? colors.primary : colors.darkGray}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="tech"
                options={{
                    headerTitle: "Tech News",
                    title: "Tech News",
                    tabBarIcon: ({ size, focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 30,
                                width: 50,
                                height: 50,
                            }}
                        >
                            <MaterialIcons
                                name={focused ? "devices" : "devices"}
                                size={26}
                                color={focused ? colors.primary : colors.darkGray}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="sport"
                options={{
                    headerTitle: "Sport News",
                    title: "Sport News",
                    tabBarIcon: ({ size, focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 30,
                                width: 50,
                                height: 50,
                            }}
                        >
                            <MaterialCommunityIcons name="basketball" size={26} color={focused ? colors.primary : colors.darkGray} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
