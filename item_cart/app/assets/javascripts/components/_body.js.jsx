var Body = React.createClass({ 
<AllItems items={this.state.items} />

  render(){ 
    return (
      <div>
        <NewItem />
        <AllItems />
      </div>
    )
  }
});