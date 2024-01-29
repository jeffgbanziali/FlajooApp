import { View, Text } from 'react-native'
import React, { useState } from 'react'

const SeeMediaPost = () => {

    const [showOptions, setShowOptions] = useState(false);

    const closeModal = () => {
        setShowOptions(false);
    };


    return (
        <>

            <Modal
                visible={showOptions}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: isDarkMode ? "rgba(0, 1, 1, 0.5)" : "rgba(0, 0, 0, 0.5)",

                    }}>

                </View>

                <View
                    style={{
                        width: "100%",
                        height: "10%",
                        marginTop: "4%",
                        zIndex: 3
                    }}
                >
                    <TouchableOpacity
                        onPress={closeModal}
                        style={{
                            width: '10%',
                            height: '100%',
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Entypo
                            size={35}
                            name='cross'
                            color="white" />
                    </TouchableOpacity>

                </View>

            </Modal>
        </>

    )
}

export default SeeMediaPost