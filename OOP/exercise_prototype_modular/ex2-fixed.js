var notesManagerModule = (function () {
    var notes;
    function loadData(notesData) {
        notes = [...notesData];
    }

    function addNote(note, numb) {
        $notes.append(
            $(`<a id="${numb}" href='#'></a>`)
                .addClass("note")
                .text(`${numb}) ${note}`)
        );
        $notes.animate({
            scrollTop: $(`#${numb}`).offset().top
        }, 0);
    }

    function addCurrentNote() {
        var current_note = $newNote.val();

        if (current_note) {
            notes.push(current_note);
            addNote(current_note, notes.length);
            $newNote.val("");
        }
    }

    function showHelp() {
        $help.show();

        document.addEventListener("click", function __handler__(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();

            document.removeEventListener("click", __handler__, true);
            hideHelp();
        }, true);
    }

    function hideHelp() {
        $help.hide();
    }

    function handleOpenHelp(evt) {
        if (!$help.is(":visible")) {
            evt.preventDefault();
            evt.stopPropagation();

            showHelp();
        }
    }

    function handleGoTop() {
        $notes.animate({
            scrollTop: $(`#1`).offset().top
        }, 0);
    }

    function handleAddNote(evt) {
        addCurrentNote();
    }

    function handleEnter(evt) {
        if (evt.which == 13) {
            addCurrentNote();
        }
    }

    function handleDocumentClick(evt) {
        $notes.removeClass("active");
        $notes.children(".note").removeClass("highlighted");
    }

    function handleNoteClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        $notes.addClass("active");
        $notes.children(".note").removeClass("highlighted");
        $(evt.target).addClass("highlighted");
    }

    function init(opts) {
        $notes = $(opts.notes);
        $newNote = $(opts.new_note);
        $openHelp = $(opts.open_help);
        $help = $(opts.help);
        $addNote = $(opts.add_note);
        $goTop = $(opts.goTop);

        // build the initial list from the existing `notes` data
        var html = "";
        for (i = 0; i < notes.length; i++) {
            let numbOfItem = i + 1;
            html += `<a id='${numbOfItem}' href='#' class='note'>` + `${numbOfItem}) ` + notes[i] + "</a>";
        }
        $notes.html(html);

        // listen to "help" button
        $openHelp.bind("click", handleOpenHelp);

        // listen to "Go top" button
        $goTop.bind("click", handleGoTop);

        // listen to "add" button
        $addNote.bind("click", handleAddNote);

        // listen for <enter> in text box
        $newNote.bind("keypress", handleEnter);

        // listen for clicks outside the notes box
        $(document).bind("click", handleDocumentClick);

        // listen for clicks on note elements
        $notes.on("click", ".note", handleNoteClick);

        document.onkeyup = function (e) {
            console.log(e.which)
            if (e.ctrlKey && e.which == 73) {
                handleGoTop();
                e.preventDefault();
                e.stopPropagation()
            }
        };
    }

    var notes = [],
        $notes,
        $newNote,
        $addNote,
        $openHelp,
        $help,
        $goTop,
        publicApi = {
            loadData,
            init
        }

    return publicApi
})();

notesManagerModule.loadData([
    "FIRST",
    "This is the first note I've taken!",
    "Now is the time for all good men to come to the aid of their country.",
    "The quick brown fox jumped over the moon."
]);

$(document).ready(function () {
    notesManagerModule.init({ notes: '#notes', new_note: '#note', add_note: '#add_note', open_help: '#open_help', help: '#help', goTop: '#go_top' });
});
