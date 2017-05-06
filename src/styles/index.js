import { StyleSheet } from 'react-native'

const primaryRed = '#F44336'
const secondaryRed = '#E57373'
const tertiaryRed = '#C62828'
const transparentRed = 'rgba(255,121,94,0.6)'
const ghostWhite = 'rgba(248,248,255,0.8)'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ghostWhite
  },
  header: {
    backgroundColor: tertiaryRed
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: ghostWhite
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '100%',
    backgroundColor: ghostWhite
  },
  cardHead: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: transparentRed,
  },
  cardBody: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: ghostWhite
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: transparentRed
  },
  button: {
    backgroundColor: primaryRed
  },
  touchableHighlight: {
    backgroundColor: secondaryRed
  },
  searchBox: {
    height: 20,
    borderWidth: StyleSheet.hairlineWidth
  }
})