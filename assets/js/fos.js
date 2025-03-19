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
        alert(response.message);
    } catch (error) {
        alert( error.response.data.message);
        // console.error("Error in API call:", error.response ? error.response.data : error.message);
    }

    // let records=await api.getAllFORRecords();
    // console.log(records);
    // console.log({date:date,sampleSealNumber:sampleSealNumber,bunkerDeliveryNoteReferenceNumber:bunkerDeliveryNoteReferenceNumber,
    //     originOfSample:originOfSample,letterOfProtestIssued:letterOfProtestIssued,letterOfProtestCopyTo:letterOfProtestCopyTo,
    //     dateSampleDestroyed:dateSampleDestroyed});
    
}); 