
const apiUrl = 'https://cors-anywhere.herokuapp.com/http://open-api.myhelsinki.fi/v2/activities';
const headers = { 
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Credentials": true,
  'Content-Type': 'application/json'
}

const familySection = document.querySelector('.family-activities');
const cruiseSection = document.querySelector('.cruise-activities');
const foodSection = document.querySelector('.food-activities');
const sightseeingSection = document.querySelector('.sightseeing-activities');
const natureSection = document.querySelector('.nature-activities');
const privateSection = document.querySelector('.private-activities');

function createActivityItem(activity, section) {
  const activityElement = document.createElement('div');
  const activityImage = document.createElement('div');
  const activityContent = document.createElement('div');
  /*
  activityElement.style.backgroundImage = `url(${activity.media[0].originalUrl})`;
  activityElement.style.backgroundPosition = 'center';
  activityElement.style.backgroundRepeat = 'no-repeat';
  activityElement.style.backgroundSize = 'cover';
  */
 activityElement.setAttribute('class','activity');
 activityElement.setAttribute('id', `${activity.id}`);

 activityImage.setAttribute('class', 'activity-img-container');
 activityElement.innerHTML = `
  <img class='activity-image'src=${activity.media[0].originalUrl} alt=${activity.alt}>
 `;
 
 activityContent.setAttribute('class', 'activity-content');

 activityContent.innerHTML=`
      <h4>${activity.descriptions.en.name}</h4>
      <p>${activity.priceEUR.from}€ - ${activity.priceEUR.to}€</p>
  `;
  activityElement.append(activityImage);
  activityElement.append(activityContent);
  section.append(activityElement)
}
fetch(apiUrl, { 
  method : 'GET',
  header: headers,
})
.then(response => response.json())
.then(data => {
    const activitiesData = data.rows;
    const familyActivities = activitiesData.filter(activity => activity.tags.includes('family_activity'));
    const cruiseActivities = activitiesData.filter(activity => activity.tags.includes('cruises_ferries'));
    const foodActivities = activitiesData.filter(activity => activity.tags.includes('food_experience'));
    const natureActivities = activitiesData.filter(activity => activity.tags.includes('nature_excursion'));
    const sightseeingActivities = activitiesData.filter(activity => activity.tags.includes('sightseeing_tours'));
    const privateActivities = activitiesData.filter(activity => activity.tags.includes('private_experience'));
    familyActivities.forEach(activity => createActivityItem(activity, familySection))
    cruiseActivities.forEach(activity => createActivityItem(activity, cruiseSection))
    foodActivities.forEach(activity => createActivityItem(activity, foodSection))
    natureActivities.forEach(activity => createActivityItem(activity, natureSection))
    sightseeingActivities.forEach(activity => createActivityItem(activity, sightseeingSection))
    privateActivities.forEach(activity => createActivityItem(activity, privateSection))

  })
  /* TO LIST OUT THE TAGS INSTANCE
  const tags = data.rows.map(row => row.tags);
  const tagConverted = []
  tags.forEach(row => row.forEach(tag => {  
      tagConverted.push(tag)
  }));

  const tagInstance = tagConverted.reduce((list,item) => {
    if (!list[item]){
      list[item] = 0
    }
    list[item] ++;
    return list
  }, {})

  console.log(tagInstance)
  */

.catch(function(error) {
  console.log('Looks like there was a problem: ', error);
});