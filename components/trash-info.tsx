import { StyleSheet, View, Text, Image } from "react-native";

interface Props {
  color: string;
  iconUrl: any;
  description: string[];
  title: string;
}

const TrashInfo = ({ color, iconUrl, description, title }: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={{ flex: 1 }}>
        <Image
          source={iconUrl}
          alt="Some info"
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={{ flex: 3 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
        <View>
          {description?.map((item, index) => (
            <View key={`list-${index}-${index}`}>
              <Text style={{ fontSize: 16 }}>{`-> ${item}`}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default TrashInfo;
