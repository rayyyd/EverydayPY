import { COLORS, SIZES } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    header: {
        position: 'relative',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        position: 'absolute',
        right: -160,
    },
    headerLeft: {
        position: 'absolute',
        left: -160,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.extraSmall,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    basicContainer: {
        backgroundColor: COLORS.background,
        padding: SIZES.atom,
        justifyContent: "center",
        alignItems: "center",
    },
    horizontalContainer: {
        flexDirection: 'row',       // lays out items horizontally
        justifyContent: 'space-between', // distributes space evenly
        alignItems: 'center',       // vertically centers items
        padding: 10,                // optional padding
    },
    verticalContainer: {
        flexDirection: 'column',      // lays out items vertically
        justifyContent: 'space-between', // distributes space evenly vertically
        alignItems: 'center',         // horizontally centers items
        padding: 10,                  // optional padding
    },
    fundsContainer: {
        backgroundColor: COLORS.background,
        padding: SIZES.atom,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 0,
    },
    fundsText: {
        fontSize: SIZES.extraSmall,
        fontWeight: "400",
        fontFamily: "JetBrainsMono-Regular",
        color: COLORS.grey,
    },
    funds: {
        fontSize: SIZES.extraLarge,
        fontWeight: "700",
        fontFamily: "JetBrainsMono-Medium",
        color: COLORS.primary,
    },
    subtitle: {
        fontSize: SIZES.medium,
        color: COLORS.secondary,
    },
    inlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',   // keeps it left-aligned inside the centered container
        marginTop: SIZES.atom,     // space under the image
      },
    tapToPay: {
        fontSize: SIZES.small,
        color: COLORS.grey,
        fontWeight: '600',
    },
    overviewContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.atom,
        borderRadius: SIZES.atom,
        margin: SIZES.atom,
        width: 175,
        height: 175,
    },
    accountsNumber: {
        fontSize: SIZES.mini,
        color: COLORS.grey,
        fontFamily: "JetBrainsMono-Regular",
        fontWeight: '400',
    },
    accountsAmount: {
        fontSize: SIZES.small,
        fontWeight: '400',
    },
})