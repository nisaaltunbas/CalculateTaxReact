import { Image, StyleSheet, Platform,TextInput,Text,TouchableOpacity,View,ScrollView} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {

  const[rate,setRate]=useState(0)
  const[miktar,setMiktar]=useState(0)
  const[sonuc,setSonuc]= useState(0)
  const[gecmis,setGecmis]=useState([])

  const hesapla = ()=>{
    setSonuc(miktar*(1+(rate/100)))
    setGecmis([...gecmis,miktar])
  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/kdvlogo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">KDV Hesapla!</ThemedText>
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">KDV Hariç Fiyat</ThemedText>
        <TextInput 
        value={miktar}
        onChangeText={setMiktar}
        style={styles.input} 
        keyboardType='numeric'
        placeholder='Ham Fiyatı Giriniz'
        />
      </ThemedView>

      <ThemedText type="subtitle">KDV Oranı</ThemedText>
      <ThemedView style={styles.oranlar}>
      <TouchableOpacity onPress={()=> setRate(1)}>
            <Text style={rate==1?styles.secilioran:styles.oran}>%1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setRate(5)}>
            <Text style={rate==5?styles.secilioran:styles.oran}>%5</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={()=> setRate(10)}>
            <Text style={rate==10?styles.secilioran:styles.oran}>%10</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setRate(20)}>
            <Text style={rate==20?styles.secilioran:styles.oran}>%20</Text>
          </TouchableOpacity>
      </ThemedView>

      <ThemedView>
        <TouchableOpacity onPress={hesapla}>
          <Text style={styles.hesaplabtn}>Hesapla</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView>
      <ThemedText type="subtitle" style={{marginTop:20}}>
        {sonuc<=0?"":`KDV Dahil:${sonuc.toFixed(2)}₺`}
      </ThemedText>
      <ThemedText type="subtitle" style={{marginTop:20}}>Geçmiş</ThemedText>
      <ScrollView horizontal={true} style={{flex:1,flexDirection:'row',marginTop:20}}>
        {gecmis.map((g)=>(
        <TouchableOpacity onPress={()=>setMiktar(g)} style={styles.tag}><Text>{g}₺</Text></TouchableOpacity>
      ))}</ScrollView>
      </ThemedView>
      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  tag:{
    marginRight:10,
    backgroundColor:'#cccccc',
    padding:10,
    borderRadius:12,
  }
  ,
  secilioran:{
    backgroundColor:'#1D88B0',
    fontSize:24,
    padding:10,
    color:'white',
    borderRadius:8,
    marginRight:15
  },
  hesaplabtn:{
    fontSize:24,
    color:'#1D88B0',
    fontWeight:'bold',
    borderWidth:3,
    borderColor:'#1D88B0',
    textAlign:'center',
    padding:8,
    borderRadius:12,
    marginTop:30
  },
  oranlar:{
    flex:1,
    flexDirection:'row'
  },
  oran:{
    backgroundColor:'#ADD3E1',
    fontSize:24,
    padding:10,
    color:'white',
    borderRadius:8,
    marginRight:15,
  }, 
  input:{
    borderBottomWidth:3,
    borderBottomColor:'#ADD3E1',
    padding:4,
    fontSize:21,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
