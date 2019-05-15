class lunbo {
  constructor(obj){
    this.index = 0;
    this.listAdd = [];
    this.obj =  obj;
    this.timeOut = null;
    this.isTrue = false;
    this.setBut(obj);
    this.refer(obj);
    
    this.findImgAttr(this.children(obj));
    this.setImg(this.listAdd);
  }
  //启动
  setBut(obj){
    this.timeOut = setInterval(()=>{
      if(this.index == this.children(obj).length){
        this.index = 0;
      }
      this.setShow(obj);
      this.index++;
    },obj.time*1000)
  }
  setShow(obj){
    let s = this.children(obj);
    for(let i = 0;i<s.length;i++){
      if(i === this.index){
        s[i].style.display = "block";
      }else{
        s[i].style.display = "none";
      }
    }
  }
  //初始化只显示第一张
  refer(obj){
    let s = this.children(obj);
    for(let i = 0; i<s.length;i++){
      if(this.index!==i){
        s[i].style.display = "none";
      }
    }
  }
  children(obj){
    return obj.id.children
  }
  //寻找所有的img标签
  findImgAttr(children){
    let s = children;
    for(let i = 0; i < s.length;i++){
      if(s[i].localName == 'img'){
        this.listAdd.push(s[i])
      }else{
        this.findImgAttr(s[i].children);
      }
    }
  }
  //给所有的img标签加上一入一出事件
  setImg(list){
    for(let i = 0; i<list.length; i++){
      list[i].onmouseleave = ()=> this.mouseLeve();
      list[i].onmouseenter = ()=> this.mouseEnter();
    }
  }
  mouseEnter(){
    console.log(!!this.timeOut);
    if(!!this.timeOut){
      console.log('ENTER')
      this.isTrue = true;
      clearInterval(this.timeOut);
    }
  }
  mouseLeve(){
    console.log('leave');
    if(this.isTrue){
      this.setBut(this.obj);
    }
  }
}