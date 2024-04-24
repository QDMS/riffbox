import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tracks } from '../../assets/data/tracks';
const track = tracks[0];

const Player = () => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Simulating music intensity change (replace with your actual logic)
        const musicIntensity = setInterval(() => {
            const randomValue = Math.random() * 100;
            Animated.timing(animation, {
                toValue: randomValue,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        }, 1000);

        return () => clearInterval(musicIntensity);
    }, []);

    if (!track) {
        return null;
    }

    const image = track.album.images?.[0];

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                {image && <Image source={{ uri: image.url }} style={styles.image} />}

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{track.name}</Text>
                    <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
                </View>

                <Ionicons
                    name={'heart-outline'}
                    size={20}
                    color={'white'}
                    style={{ marginHorizontal: 10 }}
                />
                <Ionicons
                    disabled={!track?.preview_url}
                    name={'play'}
                    size={22}
                    color={track?.preview_url ? 'white' : 'gray'}
                />
            </View>

            <Animated.View
                style={[
                    styles.visualizer,
                    {
                        transform: [
                            { scaleY: animation.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0.1, 1],
                            }) },
                        ],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -100,
        width: '100%',
        // height: 75,
        padding: 10,
    },
    player: {
        backgroundColor: '#5e0000',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 3,
        paddingRight: 15,
    },
    title: {
        color: 'white',
    },
    subtitle: {
        color: 'lightgray',
        fontSize: 12,
    },
    image: {
        height: 50,
        width: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    visualizer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginTop: 10,
        width: 5,
        borderRadius: 5,
    },
});

export default Player;
