import {
  CloseIcon,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  onClose: () => void;
}

export function Notification({ title, onClose }: Props) {
  const { navigate } = useNavigation();

  function handleOnPress() {
    navigate('details', { productId: '7' });
    onClose();
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
          {title}
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