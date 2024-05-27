import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type QuestionRouteParams = {
  user: {
    avatar: number;
    name: string;
  };
};

export type RootStackParamList = {
  Home: undefined;
  Question: QuestionRouteParams;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type QuestionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Question'>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type QuestionScreenRouteProp = RouteProp<RootStackParamList, 'Question'>;
