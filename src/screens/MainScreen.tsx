import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useAppContext} from '../contexts/AppContext';
import {colors} from '../styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/RootNavigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StatisticsIcon from '../components/Icons/StatisticsIcon';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SettingsIcon from '../components/Icons/SettingsIcon';
import Button from '../components/Button';
import RhodiumText from '../components/RhodiumText';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {fancyTimeFormat} from '../utils/time';
import YesNoModal from '../components/YesNoModal';

dayjs.extend(duration);

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {
  const state = useAppContext();
  const {bottom} = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.root]}>
        <View style={styles.top}>
          <View style={[styles.circle]} />
          <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
            <StatisticsIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              state.isTimerActive
                ? Alert.alert(
                    '',
                    'Завершите текущую задачу, чтобы перейти в настройки',
                  )
                : navigation.navigate('Settings')
            }
            style={styles.settingsBtn}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.tomato}>
            <View style={styles.tomatoGreenContainer}>
              <Image
                source={require('../assets/green.png')}
                style={styles.tomatoGreenImg}
              />
            </View>
            <View style={styles.tomatoShadow} />
            <View style={styles.circleTomato}>
              <RhodiumText style={styles.tomatoText}>
                {state.currentTimerType === 'break' ? 'Отдых' : 'Работа'}
              </RhodiumText>
              <RhodiumText style={styles.tomatoText}>
                {!state.isTimerActive
                  ? fancyTimeFormat(state.calculateSecondsNeedToBeDone())
                  : fancyTimeFormat(
                      state.secondsNeedToBeDone - state.secondsPassed,
                    )}
              </RhodiumText>
            </View>
          </View>
        </View>
        <View style={styles.btns}>
          <Button
            rootStyle={styles.btn}
            onPress={() => {
              state.isTimerActive && !state.isTimerStopped
                ? state.stopTimer()
                : state.startTimer();
            }}
            type="white">
            {state.isTimerActive && !state.isTimerStopped
              ? 'Остановить'
              : 'Запустить'}
          </Button>
          {state.currentTimerType === 'break' && !state.isTimerActive && (
            <Button
              rootStyle={styles.btn}
              onPress={() => {
                state.skipBreak();
              }}
              type="transparent">
              Пропустить
            </Button>
          )}
          {state.isTimerActive === true ? (
            <Button
              rootStyle={styles.btn}
              onPress={() => {
                setModalVisible(true);
              }}
              type="transparent">
              Отменить
            </Button>
          ) : (
            <Button
              rootStyle={styles.btn}
              onPress={() => {}}
              type="transparent"
            />
          )}
        </View>
      </View>
      {modalVisible && (
        <YesNoModal
          title={'Вы \nуверены?'}
          onDismiss={() => setModalVisible(false)}
          onConfirm={() => {
            state.cancelTimer();
            setModalVisible(false);
          }}
        />
      )}
      <Pressable
        onPress={() => navigation.navigate('Policy')}
        style={[styles.policyBtn, {bottom: 20 + bottom}]}>
        <Text style={styles.policyText}>Политика конфиденциальности</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const TOMATO_SIZE = width * 0.75;
const TOMATO_GREEN_SIZE = TOMATO_SIZE * 0.7;
// const PADDING_HORIZONTAL =
const styles = StyleSheet.create({
  root: {
    paddingBottom: 40,
    flex: 1,
    backgroundColor: colors.tomato,
    overflow: 'hidden',
  },
  btns: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    width: '70%',
    marginTop: Dimensions.get('screen').height * 0.02,
    alignSelf: 'center',
  },
  tomatoShadow: {
    position: 'absolute',
    zIndex: 0,
    bottom: 0,
    left: TOMATO_SIZE / 2,
    transform: [{rotate: '45deg'}, {translateY: (TOMATO_SIZE - 30) / 1.5}],

    backgroundColor: '#960202',
    height: TOMATO_SIZE - 30,
    width: TOMATO_SIZE * 1.8,
  },
  tomatoGreenContainer: {
    marginBottom: -30,
    zIndex: 2,
    alignItems: 'center',
  },
  tomatoText: {
    color: colors.white,
    fontSize: TOMATO_SIZE * 0.15,
    alignSelf: 'center',
  },
  safeArea: {
    // backgroundColor: colors.tomato,
    flex: 1,
  },
  tomatoGreenImg: {
    width: TOMATO_GREEN_SIZE,
    height: TOMATO_GREEN_SIZE / 2,
    resizeMode: 'contain',
  },
  circleTomato: {
    justifyContent: 'center',
    backgroundColor: '#CD2020',
    borderRadius: TOMATO_SIZE,
    borderWidth: 10,
    borderColor: colors.white,
    width: TOMATO_SIZE,
    height: TOMATO_SIZE,
  },
  policyText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
  },
  body: {
    alignItems: 'center',
  },
  tomato: {},
  policyBtn: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  circle: {
    width: 198,
    height: 198,
    backgroundColor: colors.white,
    borderRadius: 2222,
    position: 'absolute',

    right: -100,
    top: -100,
  },
  settingsBtn: {
    backgroundColor: colors.white,
  },
  top: {
    width: '100%',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default MainScreen;
