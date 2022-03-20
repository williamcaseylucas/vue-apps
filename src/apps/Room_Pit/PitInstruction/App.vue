<template>
  <div> 
  <div id="room">
  <div class="spacer-side">
  <br />
  <Title msg="Instructions" />
  <br>
  <div class="squareoff">
To get a sense of what the experiment was like, you should visit this room in a head-worn VR display and walk around the pit instead of teleporting or using the controller to move. Note that the lack of "passive haptics" (the physical set used in the UNC experiment) will diminish the sense of vertigo that you feel compared to the participants in the original experiment.
<br><br>
At each of the two locations marked with the red and blue arrows on the floor, stand on the arrow facing in the indicated direction, pick up a ball with your controller, and try to drop it on the target. (Head-Mounted Display devices such as Oculus Quests are recommended for this experiment.)
</div>
<br>
<br>
</div>
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
