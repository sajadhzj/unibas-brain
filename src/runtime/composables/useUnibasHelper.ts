export const unibasHelper = {
  handler:{
    /**
     * if your mount has undefined type so value set for mount else mount returned
     * @param mount
     * @param value
     */
    undefined:(mount , value)=>{
      return typeof mount === 'undefined' ? value : mount
    },
    /**
     * if your mount is empty string so value set for mount else mount returned
     * @param mount
     * @param value
     */
    empty:(mount , value)=>{
      return mount === '' ? value : mount
    }
  }
}
