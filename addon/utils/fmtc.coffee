`import fmt from './fmt'`
`import Ember from 'ember'`

{computed, A} = Ember
fmtc = (keys..., str) ->
  computed keys...,
    get: ->
      fmt str, A(keys).map @get.bind(@)

`export default fmtc`