function NotesManager(opts) {
    this.notes = [];

    this.init = this.init;
    this.loadData = this.loadData
}

NotesManager.prototype.loadData = function (notesData) {
    this.notes = [...notesData];
}

NotesManager.prototype.init = function (opts) {
    this.$notes = $(opts.notes);
    this.$newNote = $(opts.new_note);
    this.$openHelp = $(opts.open_help);
    this.$help = $(opts.help);
    this.$addNote = $(opts.add_note);
    this.$goTop = $(opts.goTop);

    // build the initial list from the existing `notes` data
    var html = "";
    for (let i = 0; i < this.notes.length; i++) {
        let numbOfItem = i + 1;
        html += `<a id='${numbOfItem}' href='#' class='note'>` + `${numbOfItem}) ` + this.notes[i] + "</a>";
    }
    this.$notes.html(html);

    // listen to "help" button
    this.$openHelp.bind("click", this.handleOpenHelp.bind(this));

    // listen to "Go top" button
    this.$goTop.bind("click", this.handleGoTop.bind(this));

    // listen to "add" button
    this.$addNote.bind("click", this.handleAddNote.bind(this));

    // listen for <enter> in text box
    this.$newNote.bind("keypress", this.handleEnter.bind(this));

    // listen for clicks outside the notes box
    $(document).bind("click", this.handleDocumentClick.bind(this));

    // listen for clicks on note elements
    this.$notes.on("click", ".note", this.handleNoteClick.bind(this));

    document.onkeyup = function (e) {
        // press ctrl + i to scroll to top of the list
        if (e.ctrlKey && e.which == 73) {
            this.handleGoTop();
            e.preventDefault();
            e.stopPropagation()
        }
    }.bind(this);
}


NotesManager.prototype.addNote = function (note, numb) {
    this.$notes.append(
        $(`<a id="${numb}" href='#'></a>`)
            .addClass("note")
            .text(`${numb}) ${note}`)
    );
    this.$notes.animate({
        scrollTop: $(`#${numb}`).offset().top
    }, 0);
}

NotesManager.prototype.addCurrentNote = function () {
    var current_note = this.$newNote.val();

    if (current_note) {
        this.notes.push(current_note);
        this.addNote(current_note, this.notes.length);
        this.$newNote.val("");
    }
}

// Proper way of using hard binding mechanism.
NotesManager.prototype.showHelp = function () {
    var listerWithHardBind;

    this.$help.show();
    var hideHelpListener = function __handler__(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        document.removeEventListener("click", listerWithHardBind);
        this.hideHelp();
    }

    listerWithHardBind = hideHelpListener.bind(this);
    document.addEventListener("click", listerWithHardBind);
}

// Easy way of assigning this to self as 'var self = this'.
// NotesManager.prototype.showHelp = function () {
//     var self = this;

//     self.$help.show();
//     document.addEventListener("click", function __handler__(evt) {
//         evt.preventDefault();
//         evt.stopPropagation();
//         evt.stopImmediatePropagation();

//         document.removeEventListener("click", __handler__, true);
//         self.hideHelp();
//     }, true);
// }

NotesManager.prototype.hideHelp = function () {
    this.$help.hide();
}

NotesManager.prototype.handleOpenHelp = function (evt) {
    if (!this.$help.is(":visible")) {
        evt.preventDefault();
        evt.stopPropagation();
        this.showHelp();
    }
}

NotesManager.prototype.handleGoTop = function () {
    this.$notes.animate({
        scrollTop: $(`#1`).offset().top
    }, 0);
}

NotesManager.prototype.handleAddNote = function (evt) {
    this.addCurrentNote();
}

NotesManager.prototype.handleEnter = function (evt) {
    if (evt.which == 13) {
        this.addCurrentNote();
    }
}

NotesManager.prototype.handleDocumentClick = function (evt) {
    this.$notes.removeClass("active");
    this.$notes.children(".note").removeClass("highlighted");
}

NotesManager.prototype.handleNoteClick = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.$notes.addClass("active");
    this.$notes.children(".note").removeClass("highlighted");
    $(evt.target).addClass("highlighted");
}

var myNotes = new NotesManager();
myNotes.loadData([
    "FIRST",
    "This is the first note I've taken!",
    "Now is the time for all good men to come to the aid of their country.",
    "The quick brown fox jumped over the moon."
]);

$(document).ready(function () {
    myNotes.init({ notes: '#notes', new_note: '#note', add_note: '#add_note', open_help: '#open_help', help: '#help', goTop: '#go_top' });
});