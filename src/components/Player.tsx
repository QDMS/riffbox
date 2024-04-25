import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerContext } from '../providers/PlayerProvider';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

const Player = () => {
    const [sound, setSound] = useState<Sound>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const { track } = usePlayerContext();

    useEffect(() => {
        playTrack();
    }, [track]);

    useEffect(() => {
        return sound ? () => {
            console.log("Unloading Sound");
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    const playTrack = async () => {
        if (sound) {
            await sound.unloadAsync();
        }
        if (!track?.preview_url) {
            return;
        }
        const { sound: newSound } = await Audio.Sound.createAsync({
            uri: track.preview_url,
        });
        setSound(newSound);
        setIsPlaying(true);
        await newSound.playAsync();
    };

    const pauseTrack = async () => {
        if (sound && isPlaying) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                setPlaybackPosition(status.positionMillis);
                await sound.pauseAsync();
                setIsPlaying(false);
            }
        }
    };

    const resumeTrack = async () => {
        if (sound && !isPlaying) {
            await sound.playFromPositionAsync(playbackPosition);
            setIsPlaying(true);
        }
    };

    if (!track) {
        return null;
    }

    const image = track.album.images?.[0];

    return (
        <View style={styles.container}>
            <View style={styles.player}>
                {image && <Image source={{ uri: image.url }} style={styles.image} />}
                <View>
                    <Text style={styles.title}>{track.name}</Text>
                    <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
                </View>
                <View style={styles.controls}>
                    {isPlaying ? (
                        <TouchableOpacity onPress={pauseTrack}>
                            <Ionicons name={'pause'} size={22} color={'white'} />
                        </TouchableOpacity>
                    ) : (
                        <Ionicons
                            disabled={!track?.preview_url}
                            name={'play'}
                            size={22}
                            color={track?.preview_url ? 'white' : 'gray'}
                            onPress={resumeTrack}
                        />
                    )}
                    <Ionicons
                        name={'heart-outline'}
                        size={20}
                        color={'white'}
                        style={{ marginLeft: 10 }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -100,
        width: '100%',
        padding: 10,
    },
    player: {
        backgroundColor: '#5e0000',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Player;
