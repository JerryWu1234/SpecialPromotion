
/**
 * @Description     创建老师和学生的模版
 * @param{arrary} content 请求返回的技术支持的数据
 * @param{question} question 请求返回的问答列表的数据
 * @method template
 **/
function template(content,question){
    if ( question.length === 0) return
    const el = _.createHtml.div({'class': 'question-content'},
      _.createHtml.div({"class": 'question-content-support'},
        _.createHtml.div({'class': 'qcs-tilte'},'{{position}}：',
          _.createHtml.a({ "href": '#'},'{{content}}'),
          _.createHtml.span({'class': 'qcst-color'},'（工作时间：8:30~22:00）')
        ),content
      ),
      _.createHtml.ul({'class': "question-list","onclick":"methods.switchClass({{index}},this)"},
        _.createHtml.li({'class': 'question-list-title'},
          _.createHtml.span({'class': 'qlt-gardenicon'},'•'),
          _.createHtml.div({'class': 'qlt-answer'},'{{question}}'),
          _.createHtml.i({'class': 'iconfont icon-fangxiangshang'}),
        ),
        _.createHtml.li({'class': 'question-list-idea'},
          '答：{{answer}}'
        ),question
      ),
      _.createHtml.img(
        {
          'src':'https://qn-hyphen.hfjy.com/9699c63de6fa4049ae68cf066639a015?imageView2',
          "title":"点击复制",
          "class": "question-footer-img",
          "onclick":"methods.copyTextByVideo('http://my.polyv.net/front/video/preview?vid=bf1f1aa05c2e5e63b99e665aae6ccdcb_b',this,1)"
        },)
    )
    document.body.innerHTML=""
    document.body.appendChild(el)
  }
  let methods = {
    data:{
      prevIndex: ''
    },
    switchClass(index,that){
      let prevIndex = this.data.prevIndex
      let alldom = _.findAllDom(that)
      if(prevIndex !== ''){
        _.removeClass(alldom[prevIndex].childNodes[1],'activehide')
        _.switchClass(alldom[prevIndex],'icon-fangxiangxia','icon-fangxiangshang')
      }
      this.data.prevIndex = index
      let child = that.childNodes
      _.addClass(child[1],'activehide')
      _.switchClass(that,'icon-fangxiangshang','icon-fangxiangxia')
    },
    copyTextByVideo(text,that,type){
      window.open(text);
      let data = {
        text,
        type,
        sign:'technicalSupport'
      }
      parent.postMessage(
        data,
        '*'
      )
    }
  }