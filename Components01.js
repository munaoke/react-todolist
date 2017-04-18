var InputComponents = React.createClass({
	getInitialState: function() {
		return {
			items:[
				{name:"张三",done:true},
				{name:"李四",done:true},
				{name:"王五",done:true},
				{name:"赵六",done:true},
				{name:"钱七",done:true}
			],
			allItems:[
				{name:"张三",done:true},
				{name:"李四",done:true},
				{name:"王五",done:true},
				{name:"赵六",done:true},
				{name:"钱七",done:true}
			],
			profiy:-1 
		};
	},
	addItems:function(e){
		var newItems = this.state.items;
		var addElem = this.refs.inputText.value;
		var obj = {};
		obj.name = addElem;
		obj.done = false;
		newItems.push(obj);
		this.setState({
			items: newItems,
			allItems:newItems
		});
		e.preventDefault();
	},
	handleRemove:function(Item){
		this.setState({
			items:Item,
			allItems:Item 
		});
	},
	selectItems:function(e){
		var arr = [];
		var content = this.refs.inputText.value;
		var Item = this.state.items;
		for (var i =0; i<Item.length; i++) {
			if(Item[i].name.indexOf(content) > -1){
				arr.push(Item[i]);
			}
		}
		this.setState({
			items:arr 
		});
		e.preventDefault();
	},
	allItemsInput:function(e){
		var Items = this.state.allItems;
		this.setState({
			items:Items 
		});
		e.preventDefault();
	},
	render: function() {
		return (
			<div className="InputComponents">
				<form>
					<input type="text" ref="inputText" />
					<button onClick={this.addItems}>增加</button>
					<button onClick={this.selectItems}>查找</button>
					<button onClick={this.allItemsInput}>显示全部</button>
				</form>
				<UlComponents entries={this.state.items} remove={this.handleRemove}/>
			</div>
		);
	}
});

var UlComponents = React.createClass({
	getInitialState: function() {
		return {
			profiy:-1 
		};
	},
	removeItems:function(e){
		var Item = this.props.entries;
		var index = e.target.getAttribute("data-index");
		Item.splice(index,1);
		this.props.remove(Item)
	},
	changeItems:function(e){
		var index = e.target.getAttribute("data-index");
		this.setState({
			profiy:index 
		});
	},
	completeItems:function(e){
		var index = e.target.getAttribute("data-index");
		console.log(index);
		var cont = this.refs.changeInput.value;
		console.log(cont);
		this.props.entries[index].name = cont;
		this.setState({
			profiy:-1 
		});
	},
	render: function() {
		return (
			<ul>
				{
					this.props.entries.map(function(value,index){
						if(this.state.profiy != index){
							return <li>
								<span>{value.name}</span>
								<a data-index={index} href="javascript:;" onClick={this.removeItems}>删除</a>
								<a data-index={index} href="javascript:;" onClick={this.changeItems}>修改</a>
							</li>
						}else{
							return <li>
								<input type="text" ref="changeInput" placeholder={value.name}/>
								<button data-index={index} onClick={this.completeItems}>完成</button>
							</li>
						}
					}.bind(this))
				}
			</ul>
		);
	}
});



var doc = document.getElementById('box');
ReactDOM.render(<InputComponents />,doc);
