<template>
  <div>
    <hr>
    <div id="vcomments"></div>
  </div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function(){
      // require window 
      const Valine = require('valine');
      // if (typeof window !== 'undefined') {
      //     this.window = window
      //     window.AV = require('leancloud-storage') 
      // }
      new Valine({
        el: '#vcomments',
        appId: 'HmqgBlCxKtyXkouKevm0mjSi-MdYXbMMI', // your AppId
        appKey: 'BpYvrDhBiIKp841bHO3EhDkh', // your AppKey
        notify:false,
        verify:false,
        avatar:'mp',
        placeholder: 'leave your message if you want ...',
    });
  },
}
</script>
<style scoped>
    .vempty{
        display: none !important;
    }
</style>