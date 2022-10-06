import { IonButton,IonAlert, IonContent,IonIcon, IonHeader, IonListHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { TripInfo } from '../models/TripInfo';
import { getOneTripInfo,deleteOneTripInfo} from '../databaseHandle';
import { useHistory, useParams } from 'react-router';
import { trash } from 'ionicons/icons';

import './Home.css';


interface IdParam{
  id: string
}

const InformationDetail: React.FC = () => {

  const [tripName,setTripName] = useState<string>('');
  const [destination,setDestination] = useState<string>('');
  const [tripDate,setTripDate] = useState<string>();
  const [riskAssessment, setRiskAssessment] = useState<boolean>();
  const [description, setDescription] = useState<string>('');
  const [costs,setCosts] =useState<string>();
  const[leader,setLeader] = useState<string>('');

  const [DeleteOneInfo, setDeleteOneInfo] = useState(false);

  const {id} = useParams<IdParam>()
  const history = useHistory()
  
  // getOneTripInfo
  async function fetchData() {
    const result = await getOneTripInfo(Number.parseInt(id)) as TripInfo ;
    setTripName(result.tripName);
    setDestination(result.destination);
    setTripDate(result.tripDate);
    setRiskAssessment(result.riskAssessment);
    setDescription(result.description);
    setCosts(result.costs);
    setLeader(result.leader);
  }

  async function deleteOneInfoHandler (){
    await deleteOneTripInfo(Number.parseInt(id))
    history.goBack();
  }
  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle> M-Expense </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonList>
          <IonListHeader>
            <IonLabel color={"primary"}><h1>{tripName}</h1></IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel >Name of Leader</IonLabel>
            <IonLabel>{leader}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Destination</IonLabel>
            <IonLabel>{destination}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel >Date of the trip</IonLabel>
            <IonLabel>{tripDate}</IonLabel>
          </IonItem>          
          <IonItem>
            <IonLabel >Description</IonLabel>
            <IonLabel>{description}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel >Sum of Costs($)</IonLabel>
            <IonLabel>{costs}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel >Risk Assessment</IonLabel>
            <IonLabel>{riskAssessment}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

      <IonButton onClick={() => setDeleteOneInfo(true)} class='ion-margin' color="danger" expand="block">
        <IonIcon slot="icon-only" icon={trash}></IonIcon>
      </IonButton>
       
       <IonAlert
         isOpen={DeleteOneInfo}
         onDidDismiss={() => setDeleteOneInfo(false)}
         header={'Confirm!'}
         message={`You really want to delete ' ${tripName} '`}
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
             text: 'Delete',
             handler: () => {
              deleteOneInfoHandler()
             }
           }
         ]}
       />

    </IonPage>
  );
};

export default InformationDetail;
