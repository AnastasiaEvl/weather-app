import {StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import React from "react";

export const PickerList = ({selectedValue, updateData}: { selectedValue: string, updateData: () => void }) => {
    return (
        <View style={styles.unitList}>
            <Text>Units degree:</Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(e) => updateData(e)}>
                <Picker.Item label="CHOOSE UNIT DEGREE"/>
                <Picker.Item label="Fahrenheit" value="imperial"/>
                <Picker.Item label="Celsius" value="metric"/>
                <Picker.Item label="Kelvin" value="kelvin"/>
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitList: {
        marginLeft: 10,
    },
});
