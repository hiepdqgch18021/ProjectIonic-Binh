import { IonButton, IonContent,IonAlert,IonDatetime, IonHeader, IonInput, IonItem, 
          IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, 
          IonRadioGroup,  IonTitle, IonToolbar} from '@ionic/react';
import { useEffect, useState } from 'react';
import { deleteAllTripInfo, getAllTripInfo, insertTripInfo } from '../databaseHandle';
import { TripInfo } from '../models/TripInfo';
import './Home.css';



const Home: React.FC = () => {
  const [tripName,setTripName] = useState<string>('');
  const [destination,setDestination] = useState<string>('');
  const [tripDate,setTripDate] = useState<string>();
  const [riskAssessment, setRiskAssessment] = useState<boolean>();
  const [description, setDescription] = useState<string>('');
  const [costs,setCosts] =useState<string>();
  const[leader,setLeader] = useState<string>('');
  const[allInfo,setAllInfo] = useState<TripInfo[]>([]);
  
  const [SaveInfo, setSaveInfo] = useState(false);
  const [DeleteInfo, setDeleteInfo] = useState(false);


async function fetchData(){
  const resultGetAllInfo = await getAllTripInfo();
  setAllInfo(resultGetAllInfo);
}

  const dateSelectedHandler = (e:any) =>{
    const selectedDate = new Date(e.detail.value);
    setTripDate(selectedDate.toLocaleDateString("en-GB"));
  }

  const deleteAllInfoHandler = async ()=>{
  const removeDB  = await deleteAllTripInfo();
  return removeDB;
  }



  const saveHandler = async () =>{
    const newInfo : TripInfo ={
      'tripName':tripName ,
      'destination':destination,
      'tripDate':tripDate,
      'riskAssessment':riskAssessment,
      'description':description,
      'leader':leader,
      'costs':costs,
    }

    if(!tripName ||!destination ||!tripDate ||!riskAssessment ||!leader ||!costs){
      alert("You input lacking information")
    }else{ 
      await insertTripInfo(newInfo); 
      window.location.href="/home";    
    }
  }

  useEffect(()=>{
    fetchData();
  },[]);

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
          <IonLabel position='floating'>Name of Leader</IonLabel>
          <IonInput onIonChange={e=>setLeader(e.detail.value!)}></IonInput>
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

        <IonItem>
          <IonLabel position='floating'>Sum of Costs($)</IonLabel>
          <IonInput type='number' onIonChange={e=>setCosts(e.detail.value!)}></IonInput>
        </IonItem>


        <IonList>
          <IonRadioGroup value={riskAssessment} onIonChange={e => setRiskAssessment(e.detail.value)}>
            <IonListHeader >
                <h6>Risk Assessment</h6>
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
          <h6>Your Assessment </h6>
          <IonItem>{riskAssessment ?? '(none selected'}</IonItem>
        </IonList>

        <IonButton onClick={() => setSaveInfo(true)} expand="block">save</IonButton>          
       
       <IonAlert
         isOpen={SaveInfo}
         onDidDismiss={() => setSaveInfo(false)}
         header={'Confirm!'}
         message={'Do you want to check again the information inputted?'}
         buttons={[
           {
             text: 'Back',
             role: 'cancel',
             cssClass: 'secondary',
             handler: blah => {
               console.log('Confirm Cancel: blah');
             }
           },
           {
             text: 'Save',
             handler: () => { 

              saveHandler ()
             }
           }
         ]}
       />

          <IonButton onClick={() => setDeleteInfo(true)} color="danger" expand="block">Delete</IonButton>          
       <IonAlert
         isOpen={DeleteInfo}
         onDidDismiss={() => setDeleteInfo(false)}
         header={'Confirm!'}
         message={'Do you want to DELETE all off information?'}
         buttons={[
           {
             text: 'cancel',
             role: 'cancel',
             cssClass: 'secondary',
             handler: blah => {
               console.log('Confirm Cancel: blah');
             }
           },
           {
             text: 'Delete',
             handler: () => {              
              deleteAllInfoHandler ()
             }
           }
         ]}
       />

          {/* <IonButton onClick={saveHandler}  class='ion-margin'>Save</IonButton>
          <IonButton onClick={deleteAllInfoHandler} color="danger" class='ion-margin'>Delete</IonButton><br /> */}
          <IonItemDivider>List All Information Of The Trip</IonItemDivider>

      { allInfo &&
        <IonList>
          { allInfo.map(c=>
                    <IonItem routerLink={'/Details/' + c.id} button key={c.id}>
                      <IonLabel color={"primary"}>{c.tripName}</IonLabel>                    
                    </IonItem>                
              
          )}
        </IonList>
      }

      </IonContent>
    </IonPage>
  );
};

export default Home;
