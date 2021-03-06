var STD_ICONS_ANON = [
    'star','music','heart','glass','eye-open','leaf','gift','fire','heart-empty','phone','star-empty',
    'flash','send','tower','tree-conifer','tree-deciduous','apple','knight','king','queen','tent','piggy-bank',
    'education','grain','paperclip','bell','picture','camera','book','asterisk','pencil','cloud'
];

//-------------- UserIcon ----------------------
var UserInfo = $class({
    getInitialState: function() {
        var user = this.props.user;
        var cert = baseAPI.parseCertificate(user.cert? user.cert : user);
        if(!cert) return {};
        if(cert.isAnonymous()) {
            return {
                isAnonymous: true,
                name: "anonymous-"+parseInt(cert.pub.substr(0,8), 16).toString(36).toUpperCase(),
                ico: STD_ICONS_ANON[parseInt(cert.pub.substr(-10), 16) % STD_ICONS_ANON.length],
                color: "#" + cert.pub.substr(-6)
            };
        }
        baseAPI.getCertificateInfo(cert.toString(), function(err, info){
            info.domain = info.domain || info.name + ".base.network";
            setTimeout(this.setState.bind(this, err? {error: "ERROR: "+err} : info));
        }.bind(this));

        baseAPI.getUserInfo(cert.toString(), function(err, info){
            setTimeout(this.setState.bind(this, err? {error: "ERROR: "+err} : {userInfo: info}));
        }.bind(this));
        return {
            ico: STD_ICONS_ANON[parseInt(cert.pub.substr(-10), 16) % STD_ICONS_ANON.length],
            color: "#" + cert.pub.substr(-6)
        }
    },

    toString: function() {
        return this.state.userInfo && this.state.userInfo.name || this.state.name
    },

    render: function () {
        return (
            <span>{this.toString()}</span>
        );
    }
});

var UserIcon = $class(UserInfo, {
    render: function () {
        if(this.state.isAnonymous) return (
            <div className="user-icon user-icon-anon" style={{backgroundColor: this.state.color}}>
                <i className={"icon glyphicon glyphicon-"+this.state.ico}></i>
            </div>
        );
        var icon = this.state.userInfo && this.state.userInfo.icon;
        var name = this.state.name || "";
        var html = icon? <Img src={icon} sizeLimit={50*1024} /> : name && <span>{name[0]}</span>;

        if(this.props.showLink && this.state.domain) return (
            <a className="user-icon" style={{backgroundColor: this.state.color}} title={name}  href={"//" + this.state.domain}>
                {html}
            </a>
        );
        return (
            <div className="user-icon" style={{backgroundColor: this.state.color}} title={name}>
                {html}
            </div>
        );
    }
});

var UserName = $class(UserInfo, {
    render: function() {
        if(this.state.isAnonymous) return (
            <b className="user-name user-name-anon">{this.toString()}</b>
        );
        if(this.state.domain) return (
            <a href={"//"+this.state.domain} className="user-name">{this.toString()}</a>
        );
        return (
            <b className="user-name">{this.toString()}</b>
        );
    }
});
