import Vue from 'vue'
import svgIcons from './svgIcons'

Vue.component("svgIcons", svgIcons);

const  req  =  require.context('./svg',  false,  /\.svg$/)
const  requireAll  =  requireContext  =>  {  
    return  requireContext.keys().map(requireContext)
}
requireAll(req)