<template>
  <div> 
  <div id="room" class="lightwall">
   <div class="headline squareoff" style="color:white">18th century</div>
   <br />
   <br />
   <br />
 <div class="spacer-side">

  <Title msg="Panorama" />
  <br>
<div class="squareoff">
The panorama conceived by artist Robert Barker was one of the ways to represent reality at the end of the 18th century. Barker used perspective painting to create a panorama on a canvas stretched around the cylindrical surface. Viewers stood in the middle and experienced the scene in either direction.
<br /><br />
	</div>
  </div> 
  <div xr-layer>
      <img class="centerImg" height="90" src="../../../assets/images/History/panorama.jpg"></div>
  </div>
  <div  style="fontSize:0.8em; padding-left:40px;padding-top:6px;">Robert Barker and Henry Aston Barker, Panorama of London from the Roof of Albion Mills, 1972</div>
  </div>
</template>

<script setup>
import Title from '../../../components/CenterTitle.vue'

import "../../../assets/top.css"
import "../../../assets/room.css"
</script>

<style scoped>

</style>
