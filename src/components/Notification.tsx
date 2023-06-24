import {
  CloseIcon,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text
} from 'native-base';

import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import { OSNotification } from 'react-native-onesignal';

type Props = {
  data: OSNotification;
  onClose: () => void;
}

export function Notification({ data, onClose }: Props) {
  function handleOnPress() {
    if (data.launchURL) {
      Linking.openURL(data.launchURL);
      onClose();
    }
  }

  return (
    <Pressable
      bgColor="gray.200"
      onPress={handleOnPress}
      position="absolute"
      p={4}
      pt={12}
      top={0}
      w="full"
    >
      <HStack
        justifyContent="space-between" alignItems="center">
        <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2} />

        <Text fontSize="md" color="black" flex={1}>
          {data.title}
        </Text>

        <IconButton
          variant="unstyled"
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size="3" />}
          _icon={{ color: "coolGray.600" }}
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}