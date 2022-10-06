import { IonButton, IonContent,IonCheckbox, IonDatetime, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRouterLink, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

interface TripInfo{
  tripName: string;
  destination:string;
  tripDate: string | undefined;
  riskAssessment:boolean | undefined;
  description:string;
}

const Home: React.FC = () => {
  const [tripName,setTripName] = useState<string>('');
  const [destination,setDestination] = useState<string>('');
  const [tripDate,setTripDate] = useState<string>();
  const [riskAssessment, setRiskAssessment] = useState<boolean>();
  const [description, setDescription] = useState<string>('');
  const[allInfo,setAllInfo] = useState<TripInfo[]>([]);


  const dateSelectedHandler = (e:any) =>{
    const selectedDate = new Date(e.detail.value);
    setTripDate(selectedDate.toLocaleDateString("en-GB"));
  }


  const saveHandler = () =>{
    const newInfo : TripInfo ={
      'tripName':tripName ,
      'destination':destination,
      'tripDate':tripDate,
      'riskAssessment':riskAssessment,
      'description':description
    }
    if(!tripName){
      alert("Please input the Name of the trip !")
    }
    else if(!destination){
      alert("Please input the Destination !")
    }
    else if(!tripDate){
      alert("Please input the Date of the trip !")
    }
    else if(!riskAssessment){
      alert("Please input the Risk assessment !")
    }
    else if(!description){
      alert("Please input the Description !")
    }
    else{
      setAllInfo([newInfo,...allInfo]);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>M-Expense</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonItem>
          <IonLabel position='floating'>Name of the trip</IonLabel>
          <IonInput onIonChange={e=>setTripName(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Destination</IonLabel>
          <IonInput onIonChange={e=>setDestination(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Date of the trip</IonLabel>
          <IonInput value={tripDate} id='tripDate'></IonInput>
          <IonPopover keepContentsMounted={true} trigger='tripDate' event='click'>
            <IonDatetime onIonChange={e=>dateSelectedHandler(e)}></IonDatetime>
          </IonPopover>
        </IonItem>

        <IonItem>
          <IonLabel position='floating'>Description</IonLabel>
          <IonInput onIonChange={e=>setDescription(e.detail.value!)}></IonInput>
        </IonItem>

        <IonList>
          <IonRadioGroup value={riskAssessment} onIonChange={e => setRiskAssessment(e.detail.value)}>
            <IonListHeader >
              <IonText >
                <h6>Requires risk assessment </h6>
              </IonText>
            </IonListHeader>
            <IonItem>
              <IonLabel>Exist Risk</IonLabel>
              <IonRadio slot="start" value="existRisk" />
            </IonItem>
            <IonItem>
              <IonLabel>No Risk</IonLabel>
              <IonRadio slot="start" value="noRisk" />
            </IonItem>
          </IonRadioGroup>
          <IonItemDivider>Your Assessment </IonItemDivider>
          <IonItem>{riskAssessment ?? '(none selected'}</IonItem>
        </IonList>

          <IonButton onClick={saveHandler} expand='block' class='ion-margin'>Save</IonButton>

      { allInfo &&
        <IonList>
          { allInfo.map(c=>
            <IonItem key={c.tripName}>

              <IonList>
                    <IonListHeader>
                      <IonLabel>{c.tripName}</IonLabel>
                    </IonListHeader>
                    <IonItem>
                      <IonLabel>{c.destination}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>{c.tripDate}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>{c.tripName}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>{c.riskAssessment}</IonLabel>
                    </IonItem>                    
              </IonList>
            </IonItem>
          )}
        </IonList>
      }
      </IonContent>
    </IonPage>
  );
};

export default Home;
