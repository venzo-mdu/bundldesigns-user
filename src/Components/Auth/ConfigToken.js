export const ConfigToken = () => {
      

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2){
        return parts.pop().split(';').shift()
      } ;
      return null;
    };
   
    return   {
     headers: {
      "authorization": 'Token ' + getCookie('token')
     }
  }
}
