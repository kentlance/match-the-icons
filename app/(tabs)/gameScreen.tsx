import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import IconComponent from "../(tabs)/iconComponent";

const star = require("../../assets/images/star.png");
const bug = require("../../assets/images/bug.png");
const close = require("../../assets/images/close.png");
const code = require("../../assets/images/code.png");
const web = require("../../assets/images/web.png");

interface IconState {
  id: number;
  icon: any;
  iconKey: string;
}

const icons = [
  <IconComponent
    iconKey="1"
    image={star}
    visible={false}
    shouldFlipBack={false}
    id={1}
  />,
  <IconComponent
    iconKey="6"
    image={star}
    visible={false}
    shouldFlipBack={false}
    id={1}
  />,
  <IconComponent
    iconKey="2"
    image={web}
    visible={false}
    shouldFlipBack={false}
    id={2}
  />,
  <IconComponent
    iconKey="7"
    image={web}
    visible={false}
    shouldFlipBack={false}
    id={2}
  />,
  <IconComponent
    iconKey="3"
    image={bug}
    visible={false}
    shouldFlipBack={false}
    id={3}
  />,
  <IconComponent
    iconKey="8"
    image={bug}
    visible={false}
    shouldFlipBack={false}
    id={3}
  />,
  <IconComponent
    iconKey="4"
    image={code}
    visible={false}
    shouldFlipBack={false}
    id={4}
  />,
  <IconComponent
    iconKey="9"
    image={code}
    visible={false}
    shouldFlipBack={false}
    id={4}
  />,
  <IconComponent
    iconKey="5"
    image={close}
    visible={false}
    shouldFlipBack={false}
    id={5}
  />,
  <IconComponent
    iconKey="10"
    image={close}
    visible={false}
    shouldFlipBack={false}
    id={5}
  />,
];

const GameScreen = () => {
  const [iconsVisible, setIconsVisible] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState<
    { id: number; icon: any; key: string }[]
  >([]);

  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [shuffledIcons, setShuffledIcons] = useState(icons);
  const [gameOver, setGameOver] = useState(false);
  const [shouldFlipBack, setShouldFlipBack] = useState(false);

  const [shouldShowModal, setShouldShowModal] = useState(false);

  useEffect(() => {
    // shuffle the icons array
    const shuffled = [...icons].sort(() => Math.random() - 0.5);
    setShuffledIcons(shuffled);
  }, []);

  useEffect(() => {
    // checks if game is complete with 5 matching pairs
    if (matches === 5) {
      setGameOver(true);
    }
  }, [matches]);

  const handleIconPress = (icon: IconState) => {
    if (selectedIcons.length === 0) {
      setSelectedIcons([{ id: icon.id, icon: icon.icon, key: icon.iconKey }]);
    } else if (selectedIcons.length === 1) {
      setSelectedIcons([
        ...selectedIcons,
        { id: icon.id, icon: icon.icon, key: icon.iconKey },
      ]);
      const matchingIcon = selectedIcons.find((i) => i.id === icon.id);
      if (matchingIcon) {
        // Both icons match
        setMatches(matches + 1);
        // Mark both icons as matched
        const updatedIcons = shuffledIcons.map((i) => {
          if (i.props.id === icon.id) {
            return { ...i, props: { ...i.props, matched: true } };
          }
          return i;
        });
        setShuffledIcons(updatedIcons);
        setSelectedIcons([]);
      } else {
        // No match, show modal
        setShouldShowModal(true);
      }
      setTurns(turns + 1);
    }
  };

  const handleWrongMatch = () => {
    const updatedIcons = shuffledIcons.map((icon) => {
      if (
        selectedIcons.find(
          (selectedIcon) => selectedIcon.key === icon.props.iconKey
        )
      ) {
        return { ...icon, props: { ...icon.props, shouldFlipBack: true } };
      }
      return icon;
    });
    setShuffledIcons(updatedIcons);
    setSelectedIcons([]);
    setTimeout(() => {
      const resetIcons = updatedIcons.map((icon) => {
        return { ...icon, props: { ...icon.props, shouldFlipBack: false } };
      });
      setShuffledIcons(resetIcons);
      setShouldShowModal(false);
    }, 300);
  };

  const handleRestart = () => {
    setTurns(0);
    setMatches(0);
    setGameOver(false);
    const shuffled = [...icons].sort(() => Math.random() - 0.5);
    setShuffledIcons(shuffled);
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <Modal transparent={true} visible={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalWon}>
              <Text style={styles.modalText}>
                You Won! It took you
                <Text style={{ fontWeight: "bold" }}>
                  {" " + turns + " turns "}
                </Text>
                to match all icons!
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleRestart}
              >
                <Text>Play Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <View style={styles.iconGrid}>
          {shuffledIcons.map((icon, index) => (
            <View key={index} style={styles.iconContainer}>
              <IconComponent
                key={
                  index.toString() + (icon.props.shouldFlipBack ? "flip" : "")
                }
                iconKey={index.toString()}
                image={icon.props.image}
                onPress={() => handleIconPress(icon.props)}
                visible={iconsVisible}
                shouldFlipBack={icon.props.shouldFlipBack}
                isSelected={selectedIcons.includes(icon.props)}
                id={0}
              />
            </View>
          ))}
        </View>
      )}
      <Modal transparent={true} visible={shouldShowModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalWrong}>
            <Text style={styles.modalText}>Not a match!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShouldShowModal(false);
                handleWrongMatch();
              }}
            >
              <Text>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D4B49",
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  iconContainer: {
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalWrong: {
    backgroundColor: "rgba(214, 40, 57, 0.5)",
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  modalWon: {
    backgroundColor: "#FE938C",
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#E5C98B",
    padding: 10,
    borderRadius: 5,
  },
});

export default GameScreen;
