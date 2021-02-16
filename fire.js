function fire(){

    if(keyWentDown("f")){

        hunter.addAnimation("hunter", fireImg);

    }

    if(keyWentUp("f")){

        hunter.addAnimation("hunter", hunterImg);

    }

}