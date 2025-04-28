document.querySelector('#fosForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    let form=this;
    let formData = new FormData(this);
    let date=formData.get('date');
    let sampleSealNumber=formData.get('sampleSealNumber');
    let bunkerDeliveryNoteReferenceNumber=formData.get('bunkerDeliveryNoteReferenceNumber');
    let originOfSample=formData.get('originOfSample');
    let letterOfProtestIssued=formData.get('letterOfProtestIssued');
    let letterOfProtestCopyTo=formData.get('letterOfProtestCopyTo');
    let dateSampleDestroyed=formData.get('dateSampleDestroyed');

if(!date || !sampleSealNumber || !bunkerDeliveryNoteReferenceNumber 
    || !originOfSample || !letterOfProtestCopyTo || !letterOfProtestCopyTo || !dateSampleDestroyed)
{
   return showErrorNotification("please fill all the fields");
}

    const data={
        date:date,
        sampleSealNumber:parseInt(sampleSealNumber),
        bunkerDeliveryNoteReferenceNumber:bunkerDeliveryNoteReferenceNumber,
        originOfSample:originOfSample,
        letterOfProtestIssued:parseInt(letterOfProtestIssued),
        letterOfProtestCopyTo:letterOfProtestCopyTo,
        dateSampleDestroyed:dateSampleDestroyed
    }

    try {
       
        let response=await api.createfosRecord(data);
        showSuccessNotification(response.message);
    } 
    catch (error) {
        showErrorNotification( error.response.data.message);
    }
    
}); 