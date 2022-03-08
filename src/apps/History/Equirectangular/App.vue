<template> 
<div>
  <div id="room" class="lightwall">
   <div class="headline squareoff" style="color:white">18th century</div>
   <br />
   <br />
   <br />
 <div class="spacer-side">

  <Title msg="Equirectangular Projection" />
  <br>
<div class="squareoff">
Equirectangular Projection
<br /><br />
	</div>
  </div> 
  <div xr-layer>
      <img class="centerImg" height="270" src="../../../assets/images/History/equirectangular.jpg"></div>
  </div>
</div>
</template>

<script setup>
import Title from '../../../components/CenterTitle.vue'

import "../../../assets/top.css"
import "../../../assets/room.css"
</script>

<style scoped>

</style>
