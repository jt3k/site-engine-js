var VideoEdit = $class(Form, {
    render: function() {
        return (
            <form className="edit-form" onSubmit={this.submit}>
                <h2>{transl("Edit video")}</h2>
                <div className="form-group row">
                    <div className="col-md-1">
                        <label>{transl("file")}</label>
                        {this.$inputFile("file", { placeholder: "video", required:true })}
                    </div>
                    <div className="col-md-4">
                        <label>{transl("title")}</label>
                        {this.$input("title", { placeholder: "title" })}

                        <label>{transl("description")}</label>
                        {this.$inputText("description", { placeholder: "description" })}

                        <label>{transl("who can add comments")}</label>
                        {this.$inputSelect("access", { values:[
                            { value:"self", label:"only me" },  // todo: icon
                            { value:"reg",  label:"only registered users" },
                            { value:"all",  label:"all users" }
                        ]})}

                        <br/>
                        <br/>
                        <button type="submit" className="btn btn-primary">{transl("Save")}</button>
                    &nbsp;
                        <button type="button" className="btn btn-default" onClick={this.close}>{transl("Close")}</button>
                    </div>
                </div>
            </form>
        );
    }
});

$component('video', Page, {
    tplFormEdit: VideoEdit,

    $Header: function() {
        return(
            <div className="video-page">
                <div className="video-cont">
                    <Video autoplay="true" controls="controls" src={this.get("file|video")} />
                </div>
                <div className="video-description">
                    <div className="col-xs-2">
                        <UserIcon user={this.author()} />
                    </div>
                    <div className="col-xs-7">
                        <UserName user={this.author()} /> &nbsp;
                        <span className="datetime">{this.datetime()}</span>
                        <p>{this.get('title')}</p>
                    </div>
                    <div className="col-xs-2">
                        {false && this.isEditable() && <button className="btn btn-default btn-xs" onClick={this.element().ev("remove", [], "Remove video?")}>{transl("remove")}</button>}
                        {this.isEditable() && <button className="btn btn-sm btn-primary btn-edit" onClick={this.editModeOn}>
                            <i className="glyphicon glyphicon-edit"></i> {transl("edit")}
                        </button>}
                    </div>
                </div>
                <a className="btn-close" href={this.element().parent().path}>&times;</a>
            </div>
        );
    }
});

var VideoItem = $class({
    render: function() {
        var element = this.props.element;
        return(
            <div className="video-item">
                <div className="video-desc">
                    <div className="col-xs-2">
                        <UserIcon user={element.author} />
                    </div>
                    <div className="col-xs-8">
                        <UserName user={element.author} /> &nbsp;
                        <span className="datetime">{element.datetime()}</span>
                        <p>{element.get('title')}</p>
                    </div>
                    <div className="col-xs-2">
                        {element.isEditable() && <button className="btn btn-default btn-xs" onClick={element.ev("remove", [], "Remove video?")}>{transl("remove")}</button>}
                    </div>
                </div>
                <div className="row video-cont">
                    <a href={element.path}>
                        <Video src={element.get("file|video")} width="100%" />
                    </a>
                </div>
            </div>
        );
    }
});

var VideoNew = $class(Form, {
    render: function() {
        return (
            <form onSubmit={this.submit} className="row form-group">
                <div className="col-sm-2">
                    {this.$inputFile("file", {placeholder: "Video file", required: true})}
                </div>
                <div className="col-sm-4">
                    <div className="input-group">
                        {this.$input("title", {placeholder: "Title"})}
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-primary" disabled={this.state.disabled}>{transl("Add video")}</button>
                        </span>
                    </div>
                </div>
            </form>
        );
    },

    onSubmit: function() {
        this.set('type', 'video');
        this.set('name', new Date().toISOString().replace(/[^\d]/g, ''));
    }
});

$component('video-list,videos', Page, {
    tplChildItem: VideoItem,
    tplChildForm: VideoNew
});
