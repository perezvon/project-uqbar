//adapted from http://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-6.php#sthash.lzKYA7Tl.dpuf

export default function wordCount (text) {    
//exclude  start and end white-space  
text = text.replace(/(^\s*)|(\s*$)/gi,"");  
//convert 2 or more spaces to 1    
text = text.replace(/[ ]{2,}/gi," ");  
// exclude newline with a start spacing    
text = text.replace(/\n /,"\n");  
return text.split(' ').length;  
} 