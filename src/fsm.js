class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.current_state = config.initial;
        this.previous_state = '';
        this.next_state = '';
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.current_state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.config.states).includes(state)) {
            this.previous_state = this.current_state;
            this.current_state = state
        }
        else throw new Error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        console.log(this.config.states[this.current_state].transitions[event])
        if (Object.keys(this.config.states[this.current_state].transitions).includes(event)) {
            this.previous_state = this.current_state;
            this.current_state = this.config.states[this.current_state].transitions[event];
        }
        else throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.current_state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event==undefined) return Object.keys(this.config.states);
        let states = [];
        Object.keys(this.config.states).forEach((state) => {
            if(Object.keys(this.config.states[state].transitions).includes(event)) states.push(state);
        });
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previous_state=='') return false
        this.next_state = this.current_state;
        this.current_state = this.previous_state;
        return true;*/
        if (this.history.length != 0) {
            this.redoState.push(this.state);
            var prevState = this.history.pop();
            this.history.pop();
            this.state = prevState;
            this.redoFlag = true;
        } else{
            return false;
        }
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.next_state=='') return false
        this.previous_state = this.current_state;
        this.current_state = this.next_state;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previous_state = '';
        this.next_state = '';
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
