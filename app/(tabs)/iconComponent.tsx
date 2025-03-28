// iconComponent for each icon card, reusable component
import React, { useEffect, useState } from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";

const unknown = require("../../assets/images/unknown.png");

interface IconProps {
  iconKey: string;
  id: number;
  image: any;
  style?: any;
  onPress?: () => void;
  visible: boolean;
  matched?: boolean;
  shouldFlipBack: boolean;
  isSelected?: boolean;
}

const IconComponent = ({
  iconKey,
  image,
  style,
  onPress,
  visible,
  matched,
  shouldFlipBack,
  isSelected,
}: IconProps) => {
  const [isFlipped, setIsFlipped] = useState(true);
  const [flipBack, setFlipBack] = useState(false);

  // for gameScreen. Tells this component that it should flip back
  useEffect(() => {
    if (shouldFlipBack) {
      setIsFlipped(true);
      setFlipBack(true);
      setTimeout(() => {
        setIsFlipped(false);
        setFlipBack(false);
      }, 500);
    }
  }, [shouldFlipBack]);

  const handlePress = () => {
    setIsFlipped(!isFlipped);
    onPress && onPress();
  };

  // default is unknown/hidden card
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[styles.container, (isFlipped || flipBack) && styles.flipped]}
      >
        {isFlipped || flipBack ? (
          <Image style={styles.image} source={unknown} />
        ) : (
          <Image style={styles.image} source={image} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#81523F",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  flipped: {
    backgroundColor: "#9ABD97",
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default IconComponent;
