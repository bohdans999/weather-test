import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface RadioButtonsSelectorProps<T> {
  selectedOption: T;
  selectOption: Dispatch<SetStateAction<T>>;
  options: T[];
}

export default function RadioButtonsSelector<T>({
  selectedOption,
  selectOption,
  options,
}: RadioButtonsSelectorProps<T>) {
  return (
    <View style={styles.container}>
      {options.map(option => (
        // On click selects a different unit of measurement
        <Pressable
          key={option as string}
          onPress={() => selectOption(option)}
          style={styles.radioContainer}
        >
          <View
            style={[
              styles.radioWrapper,
              {
                // Checks, whether this option is selected
                borderColor: selectedOption === option ? '#03cafc' : 'gray',
              },
            ]}
          >
            {selectedOption === option && <View style={styles.radio} />}
          </View>

          <Text style={styles.label}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    marginLeft: 16,
    color: 'white',
    textTransform: 'capitalize',
    minWidth: 60,
  },

  radioWrapper: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#03cafc',
  },
});
